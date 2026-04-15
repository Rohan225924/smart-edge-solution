# Link Checker Script

To check for broken links on your deployed site:

```bash
# Install link checker
npm install -g broken-link-checker

# Run on your production URL
blc http://your-domain.com -ro --filter-level 3
```

## Common Links to Verify

### Public Pages
- `/` - Homepage
- `/about` - About page
- `/services` - Services page
- `/blog` - Blog listing
- `/blog/seo-trends-2026` - Sample blog post
- `/contact` - Contact page

### Admin Pages
- `/admin` - Redirects to login
- `/admin/login` - Admin login
- `/admin/dashboard` - Dashboard (requires auth)
- `/admin/posts` - Blog posts (requires auth)
- `/admin/inquiries` - Contact inquiries (requires auth)
- `/admin/users` - User management (admin only)

### API Endpoints
- `/api/contact` - Contact form submission
- `/api/auth/[...nextauth]` - Authentication

## Manual Testing Checklist

1. Visit each public page
2. Test navigation between pages
3. Submit contact form
4. Try admin login
5. Test 404 by visiting `/nonexistent-page`

## All Links Verified

The following internal links are confirmed working:
- Home → Services, Contact, Blog
- About → Contact
- Services → Contact
- Navbar links (Home, About, Services, Blog, Contact)
- Footer links (Services, About, Blog, Contact)
- Admin navigation links