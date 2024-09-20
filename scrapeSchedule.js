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
         let home = $iframe(element).find('.tm1').text().trim().split(' ').slice(0, 2).join(' ');
         let away = $iframe(element).find('.tm2').text().trim().split(' ').slice(0, 2).join(' ');
         const result = $iframe(element).find('.mr').text().trim();

         // Replace "EPIC SC" with "EPIC Attack"
         if (home === "EPIC SC") home = "EPIC Attack";
         if (away === "EPIC SC") away = "EPIC Attack";

         if (date && home && away && time) {
           const [dayOfWeek, month, day] = date.split(' '); // Assuming date format is "DayOfWeek Month Day"
           
           let win = null;
           if (result === "vs") {
             win = "tp";
           } else if (result) {
             const [homeScore, awayScore] = result.split(':').map(Number);
             if (home === "EPIC Attack") {
               win = homeScore > awayScore ? 'win' : 'loss';
             } else if (away === "EPIC Attack") {
               win = awayScore > homeScore ? 'win' : 'loss';
             }
           }
           
           console.log({ date, home, away, time, result, win });
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
