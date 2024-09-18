   // scrapeSchedule.js
   const axios = require('axios');
   const cheerio = require('cheerio');

   async function scrapeSchedule() {
     try {
       const { data } = await axios.get('https://www.ursl-soccer.com/_element_display/#%2F74947%2Fteams%2F113592592%2F111362213-113592664%2FTEAM.html%3Frnd%3D1726626445783');
       const $ = cheerio.load(data);

       // Adjust the selector based on the actual HTML structure of the schedule
       const schedule = [];
       $('.schedule-table tr').each((index, element) => {
         const date = $(element).find('.date').text().trim();
         const opponent = $(element).find('.opponent').text().trim();
         const location = $(element).find('.location').text().trim();
         const time = $(element).find('.time').text().trim();

         if (date && opponent && location && time) {
           schedule.push({ date, opponent, location, time });
         }
       });

       return schedule;
     } catch (error) {
       console.error('Error scraping schedule:', error);
       return [];
     }
   }

module.exports = scrapeSchedule;