
import { getUpcomingEvents, getPastEvents } from './src/utils/events';

async function run() {
    console.log('Current Time:', new Date().toISOString());

    console.log('--- Upcoming Events ---');
    const upcoming = await getUpcomingEvents();
    upcoming.forEach(e => {
        console.log(`${e.title} - End: ${e.endDate.toISOString()}`);
    });

    console.log('\n--- Past Events ---');
    const past = await getPastEvents();
    past.forEach(e => {
        console.log(`${e.title} - End: ${e.endDate.toISOString()}`);
    });
}

run().catch(console.error);
