# Security Policy

## How is Zoid secure?

Zoid uses [Post Robot](https://github.com/krakenjs/post-robot) to do [post messaging](https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage) between multiple domains.
Zoid helps secure messaging through iframe sandboxing, domain validation, and data protection.

- **Iframe sandboxing** is a default browser feature that blocks others from accessing the data of your iframe instance.
- **Domain Validation** checks the domain of the connection made to the Zoid child component, if requested. If domains don’t match accepted domains the connect fails. This is to stop access to secure components.
- **Data Protection** is the way Zoid manages checking domains of where the data was sent from to help protect against malicious data being injected through events.

## Things Zoid does NOT protect against

- **Clickjacking** cannot be avoided. Even though the data is secure, the click is happening outside the scope of Zoid, therefore, Zoid cannot validate those actions. To learn more about **clickjacking** read [this](https://en.wikipedia.org/wiki/Clickjacking).

## Contact us

We take security very seriously and ask that you follow the following process.
If you think you may have found a security bug we ask that you privately send the details to DL-PP-Kraken-Js@paypal.com. Please make sure to use a descriptive title in the email.

## Expectations

We will generally get back to you within **24 hours**, but a more detailed response may take up to **48 hours**. If you feel we're not responding back in time, please send us a message _without detail_ on Twitter [@kraken_js](https://twitter.com/kraken_js).

## History

No reported issues
