   // scrapeSchedule.js
   const axios = require('axios');
   const cheerio = require('cheerio');

   async function scrapeSchedule() {
     try {
       console.log('Fetching schedule data...');
       
       const iframeUrl = 'https://elements.demosphere-secure.com/74947/teams/113592592/111362213-113592664/TEAM.html?rand6=446041';

       if (!iframeUrl) {
         console.error('Iframe URL not found');
         return [];
       }

       console.log('Fetching iframe content...');
       const { data: iframeHtml } = await axios.get(iframeUrl);
       const $iframe = cheerio.load(iframeHtml);

       const schedule = [];
       $iframe('.match-row').each((index, element) => {
         const date = $iframe(element).find('.match-date').text().trim();
         const opponent = $iframe(element).find('.match-opponent').text().trim();
         const location = $iframe(element).find('.match-location').text().trim();
         const time = $iframe(element).find('.match-time').text().trim();

         console.log({ date, opponent, location, time });

         if (date && opponent && location && time) {
           schedule.push({ date, opponent, location, time });
         }
       });

       console.log('Schedule fetched:', schedule);
       return schedule;
     } catch (error) {
       console.error('Error scraping schedule:', error);
       return [];
     }
   }

module.exports = scrapeSchedule;