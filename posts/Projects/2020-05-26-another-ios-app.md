# Another iOS App
I worked on my first native iOS app with Swift! [Check out the source here](https://github.com/mgerb/livestreamfailsapp).

Unfortunately I was unable to release the app, but overall it was a great learning experience.

![Live Stream Fails](/public/posts/images/wherebaryou.png)  

***

I'd be lying if I said I wasn't at least a little bit disappointed. After countless hours of hard work
and spending $100 on Apple's developer program I ended up with an app I couldn't release. As primarily a web developer,
it was refreshing learning native development with Swift, which I found to be a fantastic language. Apple's heavily object
oriented MVC approach through me off a bit in the beginning because I'm used to more of a functional component based architecture.
I got the hang of it quickly as there are plenty of resources online for learning.

## A year later

I'm writing this nearly a year after my latest commit in the project. It's something I put away and didn't
want to look at, but now that the project is put to rest I want to document my experience. I've always
wanted to have an app in the iOS app store. I wanted something that I would use regularly, but also something
that ran very smoothly and was a good user experience. I'm always impressed by apps that have such good user
interactions. I realized the only way to do this was to make a native app with Swift.

### The idea

I browse Reddit quite a bit (probably too much) and I'm a huge fan of the [Narwhal](https://apps.apple.com/us/app/narwhal-for-reddit/id845422455) app
for iOS. The UI is simple and intuitive, and I love how the comment section pans in from the bottom over the content of the post. This prevents
routing to another page to see the post content, unlike most other Reddit apps. The comment section in my app was heavily inspired by this.
The only gripe I had with the app is that videos did not play well outside of Youtube. [Twitch](https://www.twitch.tv/) clips to be more specific,
used the mobile web UI, which just felt clunky.

The live stream fails community on Reddit has grown to a pretty large size and I figured I'd create a native mobile app dedicated to browsing
live stream fails. I'd scrape content from Reddit and market it as its own Live Stream Fails app. I could create an app that had a smooth
scrolling timeline, much like Instagram, that would pre-load videos and play them at the instant of a tap. This ended up being a much better
user experience then using the web UI in the Narwhal Reddit app. The app didn't have the most features, but it was simple, intuitive was overall
a smooth user experience.

This was a project I worked off and on for about 6 months roughly. It was only toward the end I really started to dig down and get things finished up.
I even learned how to create [my own icons](https://github.com/mgerb/icons) with [Inkscape](https://inkscape.org/). It turned out this was actually
much easier than I had anticipated and Inkscape was a delight to work with.

### Rejection # 1

I submit my first app for review on May 16, 2019. This was not a surprise because I've dealt with Apple in the past and off the bat
there always seems to be at least one thing missing. In this case I had a few screenshots that were off and there were some
checkboxes I had missed due to my app displaying user generated content. These were quick to fix and I was able to submit for another review
shortly after.

```
Guideline 1.2 - Safety - User Generated Content


Your app enables the display of user-generated content but does not have the proper precautions in place.

Next Steps

To resolve this issue, please revise your app to implement all of the following precautions:

- Require that users agree to terms (EULA) and these terms must make it clear that there is no tolerance for objectionable content or abusive users
- A method for filtering objectionable content
- A mechanism for users to flag objectionable content
- A mechanism for users to block abusive users
- The developer must act on objectionable content reports within 24 hours by removing the content and ejecting the user who provided the offending content



Guideline 2.3.3 - Performance - Accurate Metadata


We noticed that your screenshots do not sufficiently reflect your app in use.

Specifically, your 6.5-inch iPhone screenshots do not reflect your app in use on a 6.5-inch iPhone.

Next Steps

To resolve this issue, please revise your screenshots to ensure that they accurately reflect the app in use on the supported devices. For example, a gaming app should feature screenshots that capture actual game play from within the app. Marketing or promotional materials that do not reflect the UI of the app are not appropriate for screenshots.

For iPhone, screenshots for 6.5-inch iPhone Xs Max and 5.5-inch devices (iPhone 6s Plus, iPhone 7 Plus, iPhone 8 Plus) are required. These screenshots will scale down for smaller device sizes.

For iPad, screenshots for 12.9-inch iPad Pro (2nd generation) and 12.9-inch iPad Pro (3rd generation) are required. These screenshots will scale down for smaller device sizes.

App Store screenshots should accurately communicate your app’s value and functionality. Use text and overlay images to highlight your app’s user experience, not obscure it. Make sure app UI and product images match the corresponding device type in App Store Connect. This helps users understand your app and makes for a positive App Store experience.

Resources

For resources on creating great screenshots for the App Store, you may want to review the App Store Product Page information available on the Apple Developer website.

Please ensure you have made any screenshot modifications using Media Manager. You should confirm your app looks and behaves identically in all languages and on all supported devices. Learn more about uploading app previews and screenshots in App Store Connect Help.



Guideline 2.3.6 - Performance - Accurate Metadata


The rating you have selected, 12+, is inconsistent with the content of your app. Since your app includes content and features involving live streaming of user generated content, it should be rated appropriately for this subject.

Next Steps

To resolve this issue, please update your Rating selections in App Store Connect.

- Log in to App Store Connect
- Click on "My Apps"
- Select your app
- Click on the app version on the left side of the screen
- Scroll down to select a Rating on the version information page
- Click the Edit button next to "Rating"
- Change the Rating selections
- Click "Done"
- Once you've completed all changes, click the "Save" button at the top of the App Version Information page.

Note: Apps must be rated accordingly for the highest level of content that the user is able to access in the app.
```

### Rejection #2

This was due to another checkbox I had missed in the review process. Some of them are a bit difficult to understand whether they are applicable to an app or not. This was a quick fix and I was able to submit for review shortly after.

```
Dear Developer,

In order to reduce fraudulent activity on the App Store and comply with government requests to address illegal online gambling activity, we are no longer allowing gambling apps submitted by individual developers. This includes both real money gambling apps as well as apps that simulate a gambling experience.

We found that you have submitted this app under an individual account and indicated in the Ratings section of App Store Connect that it contains simulated gambling. As a result, this app has been removed from the App Store. While you can no longer distribute gambling apps from this account, you may continue to submit and distribute other types of apps to the App Store.

If your app does not include gambling content, it would be appropriate to revise your app's rating in App Store Connect to more accurately reflect the content available in your app. Once you have updated your app's rating in App Store Connect, you can submit your app for review.

Going forward only verified accounts from incorporated business entities may submit gambling apps for distribution on the App Store. Visit the Enrollment page to learn more about enrolling an organization in the Apple Developer Program. For information on transferring an app to another developer account, please review the App transfer overview page in App Store Connect Developer Help.

As a reminder, the App Store Review Guidelines state that it is your responsibility to ensure your app complies with all legal requirements in any location where you make it available. Submitting apps designed to mislead or harm customers or evade the review process may result in the termination of your Apple Developer Program account. Review the Terms & Conditions of the Apple Developer Program to learn more about our policies regarding termination.

Best regards,

App Store Review
```

### Rejection #3

This next rejection I found amusing because it was really just unlucky. Apple really doesn't like any apps on their store
with any sexually explicit content. Typically live stream fails does not have much NSFW (not safe for work) content,
but it just so happens when the reviewer we going through my app, there had been a post that blew up and it contained
explicit content. Because of this, I had to filter out all NSFW posts. I couldn't even have a toggle in the settings.
At this point there was no functionality for a user to log in with their Reddit account. This was also the first notice of
the 4.2.2 minimum design functionality. I believe after this rejection, I just filtered out all NSFW posts and resubmit for
review.

```
Guideline 1.1.4 - Safety - Objectionable Content


Your app includes content that is considered pornographic.

Apps with sexually explicit content and themes are not appropriate for the App Store.

The next submission of this app may require a longer review time, and this app will not be eligible for an expedited review until this issue is resolved.

Next Steps

- Review the Objectionable Content section of the App Store Review Guidelines.
- Ensure your app is compliant with all sections of the App Store Review Guidelines and the Terms & Conditions of the Apple Developer Program.
- Once your app is fully compliant, resubmit your app for review.

Submitting apps designed to mislead or harm customers or evade the review process may result in the termination of your Apple Developer Program account. Review the Terms & Conditions of the Apple Developer Program to learn more about our policies regarding termination.

For app design information, check out the following videos: and "Designing Intuitive User Experiences," available on the Apple Developer website.

You may also want to review the iOS Human Interface Guidelines for more information on how to create a great user experience in your app.

Guideline 1.2 - Safety - User Generated Content


Your app enables the display of user-generated content tagged as NSFW (Not Safe For Work) but does not have the proper precautions in place.

Next Steps

To resolve this issue, please revise your app to implement all of the following precautions:

- Select the "Frequent/Intense" setting for Mature/Suggestive Themes in the App Store Connect Rating field
- Require that users agree to terms (EULA); these terms must make it clear that there is no tolerance for objectionable content or abusive users
- Display of NSFW content must be available only to a user logged into the app with an account
- Users cannot have a mechanism in the app to enable or disable access to NSFW content; enabling or disabling NSFW content should be done through the service website
- NSFW content must be visibly tagged in the app as NSFW content
- A method for filtering objectionable content
- A mechanism for users to flag objectionable content
- A mechanism for users to block abusive users
- The developer must act on objectionable content reports within 24 hours by removing the content and ejecting the user who provided the offending content



Guideline 4.2.2 - Design - Minimum Functionality


We noticed that your app only includes links, images, or content aggregated from the Internet with limited or no native iOS functionality. Although this content may be curated from the web specifically for your users, since it does not sufficiently differ from a mobile web browsing experience, it is not appropriate for the App Store.

Next Steps

We encourage you to review your app concept and work towards creating an app that offers customers an engaging and lasting experience that also meets the App Store’s high expectations for quality and functionality.

Apple Developer includes a variety of design and development resources. Download iOS templates from Apple UI Design Resources, learn more about crafting intuitive, well-designed apps with the Design Video collection, and review the iOS Human Interface Guidelines for best practices to follow when designing apps for the App Store.



Please see attached screenshot for details.
```

### Rejection #4

This is where I got a bit worried. At this point my app was exactly what they said it was. It just aggregated content from Reddit. Although it
offered a nice native video feed, this was still not good enough for Apple. This was starting to be a little disheartening, but I had already
put so much work into this I had to keep going. At this point I knew I needed to add more native features. I added the ability to log in
with a Reddit account, upvote/downvote posts, and even submit comments. I also added the ability to change the quality of the video streams
based on cellular or wifi connectivity. Adding these "native" features took some time, but I was able to submit for review a few weeks later.
At this point there wasn't much else I could do other than wait.

```
Guideline 4.2.2 - Design - Minimum Functionality


We have continued to notice that your app only includes links, images, or content aggregated from the Internet with limited or no native iOS functionality.

Specifically, we were unable to find any interactive functionality within the app.

Although this content may be curated from the web specifically for your users, since it does not sufficiently differ from a mobile web browsing experience, it is not appropriate for the App Store.

Next Steps

We encourage you to review your app concept and work towards creating an app that offers customers an engaging and lasting experience that also meets the App Store’s high expectations for quality and functionality.

Apple Developer includes a variety of design and development resources. Download iOS templates from Apple UI Design Resources, learn more about crafting intuitive, well-designed apps with the Design Video collection, and review the iOS Human Interface Guidelines for best practices to follow when designing apps for the App Store.
```

### Rejection #5

I just wanted to give up at this point. I didn't know what to do as I already added more "native" features to the app. I didn't want to add extra
bloat to the app just to get it released. The only idea I had left was to submit an appeal to Apple.

```
Guideline 4.2.2 - Design - Minimum Functionality


Upon further review, we have still found that your app only includes links, images, or content aggregated from the Internet with limited or no native iOS functionality. Although this content may be curated from the web specifically for your users, since it does not sufficiently differ from a mobile web browsing experience, it is not appropriate for the App Store.

Next Steps

We encourage you to review your app concept and work towards creating an app that offers customers an engaging and lasting experience that also meets the App Store’s high expectations for quality and functionality.

Apple Developer includes a variety of design and development resources. Download iOS templates from Apple UI Design Resources, learn more about crafting intuitive, well-designed apps with the Design Video collection, and review the iOS Human Interface Guidelines for best practices to follow when designing apps for the App Store.
```

### App Appeal

After spending countless hours researching on this 4.2.2 guideline I realized that there was no real answer. There are plenty of other people in the same
boat I am in. This was the appeal I submit to Apple.

```
Hello,

Thanks for the opportunity to submit an appeal for my app Live Stream Fails to the App Store.

Firstly, I do agree this app contains content aggregated from the internet (from Reddit specifically), very much like other extremely popular iOS Reddit apps currently existing in the iOS App Store (The official Reddit App, Beam, Narwhal, BaconReader, and Apollo to name a few).

Live Stream Fails was rejected for violating Guideline 4.2.2, which leads me to confusion as it provides similar features as these other popular Reddit Apps. Live Stream Fails differs because it is tailored to a specific Reddit community and provides a seamless native video feed, which is unique to the App.

I do believe Live Stream Fails complies with Guideline 4.2.2 and provides the necessary native features, some of which cannot be provided by the mobile web. The main intention of this App is to provide the absolute best user experience when it comes to viewing short video clips quickly and efficiently. This just cannot be done without taking advantage of what a native iOS App provides.

Features include the following:

- native video feed with full screen support
- video preloading
- video caching with options
- offline video viewing
- video quality option based on connectivity
- persistent login via Reddit Oauth
- reply to posts/comments
- upvote/downvote comments/posts

I strive to make the highest quality Apps I can possibly make and I would really appreciate any feedback where I can improve the App.

Please feel free to reach out to me via phone any time as I would love to have a discussion if rejection persists.

Thank you,
Mitchell
```

### Apple's response

It was about a month later and I never got a response from Apple. The least they could do is just tell me I can't submit my app. I ended up emailing
them and they finally got back to me.

```
Hello,

Thank you for contacting App Store Review. From your request, we understand that you seeking the status of an appeal that you submitted on July 6, 2019. 

The App Review Board evaluated your app and determined that the original rejection feedback is valid. Your app does not comply with App Store Review Guideline 4.2.2.

To resolve this issue, please ensure your app includes features, content, and UI that elevate it beyond being primarily a repackaged website or marketing materials.

We hope you will consider making the necessary changes to be in compliance with the App Store Review Guidelines and will resubmit your revised binary.

For questions regarding your app’s review, please respond in Resolution Center in App Store Connect, where a reviewer who is familiar with your app can assist you.

We hope this information helps. Thank you for your time and understanding. Your case number is 100861365476.

Best regards,

Jamey
App Store Review
```

## Wrapping up

At this point I was beyond frustrated and just set the project aside. I was especially frustrated because Apple forces developers to pay $100
just to get an app in review. I realize this is to sift out bogus apps, but this is a hefty price tag just to get declined repeatedly with no other
response than "To resolve this issue, please ensure your app includes features, content, and UI that elevate it beyond being primarily a
repackaged website or marketing materials."

Overall this was a great learning experience and I'm still glad I did it. I don't have an app in the app store, but I gained the knowledge of Swift,
Inkscape, and the entire development/release process of a native mobile app. It was really fun to work on and I've decided to [open source the work
I have done](https://github.com/mgerb/livestreamfailsapp).
