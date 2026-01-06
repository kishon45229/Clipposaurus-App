# Clipposaurus

Clipposaurus is a zero-signup, zero-knowledge digital clipboard built on Next.js. Share text, code, and files (up to 50MB) with a three-word Drop Key that never leaves your device. Everything is encrypted in the browser and deleted automatically upon expiry.

> **⚠️ Beta Notice:** Clipposaurus is currently in beta testing. You may encounter errors, bugs, or temporary service unavailability as we improve the platform. Please report any issues you experience.

## Key Features

**Privacy by design - not by promise**  
Content is encrypted before it leaves your browser, ensuring nothing readable ever reaches our servers.

**No accounts or analytics**  
Each drop stands alone. We never request emails, trackers, or device fingerprints.

**Auto-expiring by default**  
Drops self-destruct after the timer expires or the moment you access them. No leftovers, no history.

**Open source & transparent**  
Our code is publicly available for review. We welcome security audits to ensure your data's safety.

## How to Use

### Creating a Drop

1. Visit [clipposaurus.com](https://app.clipposaurus.com) and click the **"Create Drop"** button
2. Add your content: text, code, files, or any combination
3. Enter a user secret passphrase
4. Choose a retention period:
   - Delete on access (maximum retention: 1 hour)
   - Keep for 30 minutes, then delete
   - Keep for 1 hour, then delete
5. Click **"Make My Drop"** to encrypt your content
6. Save the generated Drop Key (contains identifier, system secret, and user secret)

**Important:** Keep your Drop Key secure—it's required to access your content.

### Opening a Drop

1. Visit [clipposaurus.com](https://app.clipposaurus.com) and click **"Open Drop"**
2. Enter your Drop Key
3. Your content will be decrypted and displayed

For detailed documentation, visit [docs.clipposaurus.com](https://docs.clipposaurus.com). The docs are also available in the repository [https://github.com/kishon45229/Clipposaurus-Docs.git](https://github.com/kishon45229/Clipposaurus-Docs.git).

## Technical Architecture

[Upstash Redis](https://upstash.com) serves as the primary storage for drop content and metadata.  
[Cloudflare R2](https://www.cloudflare.com/developer-platform/products/r2/) and [Backblaze B2](https://www.backblaze.com/cloud-storage) provide object storage for file uploads.

## License

This project is licensed under the MIT License.

## Contributing

1. Fork and clone the repository
2. Install dependencies and create your `.env.local` file
3. Run `npm run lint` before opening a pull request

Issues and pull requests are welcome. Please maintain the zero-knowledge guarantees when modifying storage or cryptographic flows.

## Support

If Clipposaurus saves you time or strengthens your privacy, please consider supporting the project:

- [GitHub Sponsors](https://github.com/sponsors/kishon45229)
- [Buy Me a Coffee](https://buymeacoffee.com/kishon45229)

Your support helps us maintain and improve this fast, secure, and open-source clipboard for everyone.
