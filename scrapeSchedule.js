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
       let nextUpGameIndex = null;
       let mostRecentGameIndex = null;
       const now = new Date();

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
           
           const gameDate = new Date(`${month} ${day}, ${new Date().getFullYear()} ${time}`);
           let game_status = null;

           if (gameDate > now) {
             if (!nextUpGameIndex || gameDate < new Date(`${schedule[nextUpGameIndex].month} ${schedule[nextUpGameIndex].day}, ${new Date().getFullYear()} ${schedule[nextUpGameIndex].time}`)) {
               nextUpGameIndex = index;
             }
           } else {
             if (!mostRecentGameIndex || gameDate > new Date(`${schedule[mostRecentGameIndex].month} ${schedule[mostRecentGameIndex].day}, ${new Date().getFullYear()} ${schedule[mostRecentGameIndex].time}`)) {
               mostRecentGameIndex = index;
             }
           }

           schedule.push({ dayOfWeek, month, day, time, home, away, result, win, game_status });
         }
       });

       if (nextUpGameIndex !== null) {
         schedule[nextUpGameIndex].game_status = 'nextUp';
       }
       if (mostRecentGameIndex !== null) {
         schedule[mostRecentGameIndex].game_status = 'mostRecent';
       }

       console.log('Schedule fetched:', schedule);
       return schedule;
     } catch (error) {
       console.error('Error scraping schedule:', error);
       return [];
     }
   }

module.exports = scrapeSchedule;

scrapeSchedule();
