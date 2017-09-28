# Top of Reddit
I created a Github repo that records the top Reddit posts every
day. It's called
[Top of Reddit](https://github.com/mgerb/top-of-reddit).
I was inspired to do this from [another repo that keeps track of Github's trending projects](https://github.com/josephyzhou/github-trending).

***

I've always been interested in the history of the internet and the content within it.
Reddit is one of my top visited sites, so I thought it would be a cool and simple project to record every post that makes it to the front page of /r/all and automatically update the Github repo every day.

[Check out the source code and project itself here.](https://github.com/mgerb/top-of-reddit)

## Technical Aspects
I immediately knew I was going to use Go as a language for this project,
mainly because it's a personal favorite of mine for back end work,
but also because I was interested in the [BoltDB](https://github.com/boltdb/bolt)
key/value store. It was a perfect candidate for this job because I
only needed to store/read a few simple data objects. It was also embedded and
did not require extra setup such as PostgreSQL for example. I could have opted
out of the peristent storage, but this would have caused any of the recorded data
to have been lost upon server failure or restart.

### Reddit API
It's actually extremely easy to pull data from Reddit in nice JSON format.
'.json' can be appended to almost any Reddit URL to pull back the data in JSON.
For example the end point this project hits is `https://www.reddit.com/r/all.json`.

```go
// send http request to reddit
func getPosts(subreddit string) (string, error) {
  client := &http.Client{}

  req, err := http.NewRequest("GET", REDDIT_URL+subreddit+".json", nil)

  req.Header.Add("User-Agent", USER_AGENT)

  response, err := client.Do(req)
  if err != nil {
    return "", err
  }

  defer response.Body.Close()

  body, err := ioutil.ReadAll(response.Body)
  if err != nil {
    return "", err
  }

  return string(body), nil
}
```

This data is then converted from a string into an object we can work with.

```go
type RedditPost struct {
  Subreddit    string  `json:"subreddit"`
  ID           string  `json:"id"`
  Gilded       int     `json:"gilded"`
  Score        int     `json:"score"`
  Author       string  `json:"author"`
  Domain       string  `json:"domain"`
  Over_18      bool    `json:"over_18"`
  Thumbnail    string  `json:"thumbnail"`
  Permalink    string  `json:"permalink"`
  Url          string  `json:"url"`
  Title        string  `json:"title"`
  Created      float64 `json:"created"`
  Created_utc  float64 `json:"created_utc"`
  Num_comments int     `json:"num_comments"`
  Ups          int     `json:"ups"`

  // extra fields
  TopPosition int // highest achieved position on front page
}
```

Each post is stored in a BoltDB bucket for that day's date.
Reddit posts contain a unique ID and this is the key in which they are
indexed by. It will first check if the Reddit post exists in yesterday's
store, and skip that post. If a Reddit post already exists in the
day's store, the top position achieved and the top score are both updated.
Finally, if it doesn't exist at all it is stored as is.

```go
// check if post was in yesterdays top posts
yesterday := daily_bucket.Bucket(getYesterdayBucket())
if yesterday != nil && yesterday.Get([]byte(post.ID)) != nil {
  continue
}

post.TopPosition = index + 1

// get value stored in database
storedPostString := today.Get([]byte(post.ID))

// if post is already stored in database - check to update highest score
if storedPostString != nil {
  storedPost := RedditPost{}
  err := json.Unmarshal(storedPostString, &storedPost)
  if err != nil {
    return err
  }

  // only store the highest score a post achieves
  if storedPost.Score > post.Score {
    post.Score = storedPost.Score
  }

  // only store the highest position a post achieves
  if storedPost.TopPosition < index+1 {
    post.TopPosition = storedPost.TopPosition
  }
} else {
  fmt.Println("Updating new post: " + post.Title)
}
```

The main loop of the program executes every 30 seconds.
It pulls the top 25 Reddit posts from /r/all and stores/updates
them in the database. It also checks to see if the date rolls
over to the next day. The current day's date is persisted in the data
store in case the program were ever to crash during date rollover.
This way when the program starts up again it will know if the
day has changed.

```go
storedDay := b.Get(TODAY_KEY)

// if day turns over
if storedDay == nil || string(getTodayBucket()) != string(storedDay) {
  // set today's date in database
  err := b.Put(TODAY_KEY, getTodayBucket())
  ...
}
```

If the day has rolled over the new current day is persisted
and all of now yesterday's Reddit posts are read from storage,
written to a markdown file, committed, and pushed to Github.

```go
for index, p := range posts {
  permalink := "http://reddit.com" + p.Permalink
  file.WriteString("## " + strconv.Itoa(index+1) + ". [" + p.Title + "](" + permalink + ") - " + strconv.Itoa(p.Score) + "\n")
  file.WriteString("#### [r/" + p.Subreddit + "](http://reddit.com/r/" + p.Subreddit + ")")
  file.WriteString(" - [u/" + p.Author + "](http://reddit.com/u/" + p.Author + ") - ")
  file.WriteString(strconv.Itoa(p.Num_comments) + " Comments - ")
  file.WriteString("Top position achieved: " + strconv.Itoa(p.TopPosition) + "\n\n")

  // don't post image link if thumbnail doesn't exist
  if p.Thumbnail == "default" || p.Thumbnail == "self" {
    continue
  }

  // don't show thumbnail if NSFW
  if p.Over_18 {
    file.WriteString("<a href=\"" + p.Url + "\"><img src=\"https://github.com/mgerb/top-of-reddit/raw/master/nsfw.jpg\"></img></a>\n\n")
  } else {
    file.WriteString("<a href=\"" + p.Url + "\"><img src=\"" + p.Thumbnail + "\"></img></a>\n\n")
  }
}
```

```go
func pushToGithub() error {
  fmt.Println("Pushing to Github...")
  commitMessage := "Adding posts for " + string(getYesterdayBucket())

  out, err := exec.Command("git", "add", ".").Output()
  if err != nil {
    return err
  }
  fmt.Println(string(out))

  out, err = exec.Command("git", "commit", "-m", commitMessage).Output()
  if err != nil {
    return err
  }
  fmt.Println(string(out))

  out, err = exec.Command("git", "push", "origin", "master").Output()
  if err != nil {
    return err
  }
  fmt.Println(string(out))

  return nil
}
```

These are just some snippets from the program. Check out the full source code [here](https://github.com/mgerb/top-of-reddit/blob/master/main.go).
