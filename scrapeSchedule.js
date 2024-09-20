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
       $iframe('.GameRow').each((index, element) => {
         const date = $iframe(element).find('.date').text().trim();
         const time = $iframe(element).find('.time').text().trim();
         const home = $iframe(element).find('.tm1').text().trim();
         const away = $iframe(element).find('.tm2').text().trim();
         const result = $iframe(element).find('.mr').text().trim();

         console.log({ date, home, away, time, result });

         if (date && home && away && time) {
           const [dayOfWeek, month, day] = date.split(' '); // Assuming date format is "DayOfWeek Month Day"
           
           let win = null;
           if (result) {
             const [homeScore, awayScore] = result.split(':').map(Number);
             if (home === "EPIC SC Attack White 2014B") {
               win = homeScore > awayScore ? 'win' : 'loss';
             } else if (away === "EPIC SC Attack White 2014B") {
               win = awayScore > homeScore ? 'win' : 'loss';
             }
           }

           schedule.push({ dayOfWeek, month, day, time, home, away, result, win });
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

scrapeSchedule();
