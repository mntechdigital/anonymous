# Facebook Valid Insights Metrics

## Error Fix

If you're getting `(#100) The value must be a valid insights metric`, it means you're requesting invalid metric names from Facebook Graph API.

## Valid Page Insights Metrics

### Page Metrics (require `pages_read_engagement` permission)

**Impressions & Reach:**

- `page_impressions` - Total page impressions
- `page_impressions_unique` - Unique page impressions
- `page_impressions_paid` - Paid impressions
- `page_impressions_organic` - Organic impressions

**Engagement:**

- `page_engaged_users` - People who engaged with your page
- `page_post_engagements` - Total post engagements
- `page_consumptions` - Page consumptions (clicks)
- `page_consumptions_unique` - Unique page consumptions

**Views:**

- `page_views_total` - Total page views
- `page_fan_adds` - New page likes
- `page_fan_removes` - Page unlikes

**Fans/Followers:**

- `page_fans` - Total page fans/followers
- `page_fans_online` - Fans online
- `page_fans_country` - Fans by country
- `page_fans_city` - Fans by city

**Video:**

- `page_video_views` - Total video views
- `page_video_views_paid` - Paid video views
- `page_video_views_organic` - Organic video views

## Valid Post Insights Metrics

### Post Metrics (require `pages_read_engagement` permission)

**Impressions & Reach:**

- `post_impressions` - Total post impressions
- `post_impressions_unique` - Unique post impressions
- `post_impressions_paid` - Paid impressions
- `post_impressions_organic` - Organic impressions
- `post_impressions_viral` - Viral impressions

**Engagement:**

- `post_engaged_users` - People who clicked anywhere in your post
- `post_clicks` - Clicks on post
- `post_clicks_unique` - Unique clicks on post

**Reactions:**

- `post_reactions_by_type_total` - Total reactions by type (like, love, wow, haha, sad, angry)

**Video (for video posts only):**

- `post_video_views` - Video views
- `post_video_views_organic` - Organic video views
- `post_video_views_paid` - Paid video views
- `post_video_complete_views_30s` - 30-second video views

## Usage Examples

### Page Insights Request

```
GET https://graph.facebook.com/v24.0/{page-id}/insights
  ?metric=page_impressions,page_impressions_unique,page_engaged_users,page_fans
  &period=day
  &since=2025-12-01
  &until=2025-12-14
  &access_token={page_access_token}
```

### Post Insights Request

```
GET https://graph.facebook.com/v24.0/{post-id}/insights
  ?metric=post_impressions,post_impressions_unique,post_engaged_users,post_clicks,post_reactions_by_type_total
  &access_token={page_access_token}
```

## Period Options

- `day` - Daily data
- `week` - Weekly data (available for some metrics)
- `days_28` - 28-day data (available for some metrics)
- `lifetime` - Lifetime data (default for post insights)

## Common Errors

### Error: Invalid Metric

```json
{
  "error": {
    "message": "(#100) The value must be a valid insights metric",
    "type": "OAuthException",
    "code": 100
  }
}
```

**Fix:** Use only the metrics listed above. Check for typos.

### Error: Metric Not Available

Some metrics are only available for:

- Specific post types (e.g., `post_video_views` only for video posts)
- Specific periods (e.g., some metrics don't support `day` period)
- Pages with sufficient data/activity

## Backend Fix Required

Your backend needs to update the metrics in the API calls to Facebook. Example fix:

**Before (❌ Invalid):**

```javascript
const metrics =
  "post_impressions,post_engaged_users,post_reactions_by_type_total";
```

**After (✓ Valid):**

```javascript
const metrics =
  "post_impressions,post_impressions_unique,post_engaged_users,post_clicks,post_reactions_by_type_total";
```

## Reference

- [Facebook Page Insights Documentation](https://developers.facebook.com/docs/graph-api/reference/insights)
- [Facebook Post Insights Documentation](https://developers.facebook.com/docs/graph-api/reference/insights)
