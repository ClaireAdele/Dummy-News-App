const {updateDate} = require('../db/utils/data-manipulation')

describe('updateDate', () => {
    test('returns an empty array when passed with an empty array', () => {
        expect(updateDate([])).toEqual([]);
    });

    test('when passed an array of one object without a vote property, returns a copy of the original array witn updated created_at value', () => {
        const arrayArticle = [{
            title: 'Running a Node App',
            topic: 'coding',
            author: 'jessjelly',
            body:
              'This is part two of a series on how to get up and running with Systemd and Node.js. This part dives deeper into how to successfully run your app with systemd long-term, and how to set it up in a production environment.',
            created_at: 1471522072389,
          }]
            const newDate = new Date(1471522072389);
            
            expect(updateDate(arrayArticle)).toEqual([{
            title: 'Running a Node App',
            topic: 'coding',
            author: 'jessjelly',
            body:
              'This is part two of a series on how to get up and running with Systemd and Node.js. This part dives deeper into how to successfully run your app with systemd long-term, and how to set it up in a production environment.',
              created_at: newDate
          }])

    });
    test('when passed an array of multiple objects without a vote property, returns a copy of the original array with objects + a votes property initialised to zero', () => {
        
        const newDate_1 = new Date(1471522072389);
        const newDate_2 = new Date(1500584273256)
        const newDate_3 = new Date(1500659650346)

        const arrayArticles = [
            {
              title: 'Running a Node App',
              topic: 'coding',
              author: 'jessjelly',
              body:
                'This is part two of a series on how to get up and running with Systemd and Node.js. This part dives deeper into how to successfully run your app with systemd long-term, and how to set it up in a production environment.',
              created_at: 1471522072389,
            },
            {
              title: "The Rise Of Thinking Machines: How IBM's Watson Takes On The World",
              topic: 'coding',
              author: 'jessjelly',
              body:
                'Many people know Watson as the IBM-developed cognitive super computer that won the Jeopardy! gameshow in 2011. In truth, Watson is not actually a computer but a set of algorithms and APIs, and since winning TV fame (and a $1 million prize) IBM has put it to use tackling tough problems in every industry from healthcare to finance. Most recently, IBM has announced several new partnerships which aim to take things even further, and put its cognitive capabilities to use solving a whole new range of problems around the world.',
              created_at: 1500584273256,
            },
            {
              title: '22 Amazing open source React projects',
              topic: 'coding',
              author: 'happyamy2016',
              body:
                'This is a collection of open source apps built with React.JS library. In this observation, we compared nearly 800 projects to pick the top 22. (React Native: 11, React: 11). To evaluate the quality, Mybridge AI considered a variety of factors to determine how useful the projects are for programmers. To give you an idea on the quality, the average number of Github stars from the 22 projects was 1,681.',
              created_at: 1500659650346,
            }]

        const updatedArticles = [
            {
              title: 'Running a Node App',
              topic: 'coding',
              author: 'jessjelly',
              body:
                'This is part two of a series on how to get up and running with Systemd and Node.js. This part dives deeper into how to successfully run your app with systemd long-term, and how to set it up in a production environment.',
            created_at: newDate_1
            
            },
            {
              title: "The Rise Of Thinking Machines: How IBM's Watson Takes On The World",
              topic: 'coding',
              author: 'jessjelly',
              body:
                'Many people know Watson as the IBM-developed cognitive super computer that won the Jeopardy! gameshow in 2011. In truth, Watson is not actually a computer but a set of algorithms and APIs, and since winning TV fame (and a $1 million prize) IBM has put it to use tackling tough problems in every industry from healthcare to finance. Most recently, IBM has announced several new partnerships which aim to take things even further, and put its cognitive capabilities to use solving a whole new range of problems around the world.',
                created_at: newDate_2
            },
            {
              title: '22 Amazing open source React projects',
              topic: 'coding',
              author: 'happyamy2016',
              body:
                'This is a collection of open source apps built with React.JS library. In this observation, we compared nearly 800 projects to pick the top 22. (React Native: 11, React: 11). To evaluate the quality, Mybridge AI considered a variety of factors to determine how useful the projects are for programmers. To give you an idea on the quality, the average number of Github stars from the 22 projects was 1,681.',
                created_at: newDate_3
            }]
        expect(updateDate(arrayArticles)).toEqual(updatedArticles);
    });
})