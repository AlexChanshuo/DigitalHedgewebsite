import cron from 'node-cron';
import { fetchAllActiveSources } from './rssParserService';
import { processPendingContent, runAutoPublish } from './autoPostService';

/**
 * Initialize cron jobs for the AI Content Aggregator
 */
export function initCronJobs() {
    console.log('Initializing cron jobs...');

    // Job 1: Fetch RSS feeds every hour (at minute 0)
    // 0 * * * *
    cron.schedule('0 * * * *', async () => {
        console.log('Running scheduled RSS fetch...');
        try {
            const result = await fetchAllActiveSources();
            console.log('RSS Fetch Result:', result);

            // Trigger processing immediately after fetch if new items found
            if (result.newItems > 0) {
                console.log('New items found. Triggering processing...');
                const processResult = await processPendingContent(5); // Process up to 5 items
                console.log('Processing Result:', processResult);
            }
        } catch (error) {
            console.error('Scheduled RSS fetch failed:', error);
        }
    });

    // Job 2: Process pending content every 2 hours (at minute 15) as a fail-safe
    // to pick up items that might have failed or been skipped
    // 15 */2 * * *
    cron.schedule('15 */2 * * *', async () => {
        console.log('Running scheduled content processing (fail-safe)...');
        try {
            const result = await processPendingContent(5);
            console.log('Processing Result:', result);
        } catch (error) {
            console.error('Scheduled processing failed:', error);
        }
    });

    // Job 3: Auto-publish check every hour (at minute 30)
    // It checks the AppSettings to see if auto-publish is enabled and respects the daily limit
    // 30 * * * *
    cron.schedule('30 * * * *', async () => {
        console.log('Running scheduled auto-publish check...');
        try {
            const result = await runAutoPublish();
            console.log('Auto-publish Result:', result);
        } catch (error) {
            console.error('Scheduled auto-publish failed:', error);
        }
    });

    console.log('Cron jobs initialized.');
}
