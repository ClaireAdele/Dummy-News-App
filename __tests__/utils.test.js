const { updateDate, createLookUp, modCommentsData } = require('../db/utils/data-manipulation')

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

  test('It does not mutate the input array and returns a new array', () => {
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
      updateDate(arrayArticles)
      expect(arrayArticles).toEqual([
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
        }])

        expect(updateDate(arrayArticles)).not.toBe(arrayArticles);
  });
});

describe('createLookUp', () => {
    test(' return an empty obj when passed and empty array', () => {
      expect(createLookUp([], "title", "article_id")).toEqual({})
    });

    test('return a new obj with the title and article_id key value pair', () => {
      const data = createLookUp([{
        article_id: 1,
        title: 'Running a Node App',
        body: 'This is part two of a series on how to get up and running with Systemd and Node.js. This part dives deeper into how to successfully run your app with systemd long-term, and how to set it up in a production environment.',
        votes: 0,
        topic: 'coding',
        author: 'jessjelly',

      }], "title", "article_id")
      expect(data).toEqual({ 'Running a Node App': 1 })
    });

    test('return a new obj with the title and article_id key value pair', () => {
      const data = createLookUp([{
        article_id: 1,
        title: 'Running a Node App',
        body: 'This is part two of a series on how to get up and running with Systemd and Node.js. This part dives deeper into how to successfully run your app with systemd long-term, and how to set it up in a production environment.',
        votes: 0,
        topic: 'coding',
        author: 'jessjelly',

      }, {
        article_id: 28,
        title: 'High Altitude Cooking',
        body: 'Most backpacking trails vary only a few thousand feet elevation. However, many trails can be found above 10,000 feet. But what many people don’t take into consideration at these high altitudes is how these elevations affect their cooking.',
        votes: 0,
        topic: 'cooking',
        author: 'happyamy2016',
      }], "title", "article_id")
      expect(data).toEqual({ 'Running a Node App': 1, 'High Altitude Cooking': 28 })
    });
});


describe('modCommentsData', () => {
  test('should return an empty array  when passed and empty array', () => {
    expect(modCommentsData([], {})).toEqual([])
  });

  test('should return a new array of a modified  comment with a article_id property', () => {
    const input_1 = [{
      body: 'Itaque quisquam est similique et est perspiciatis reprehenderit voluptatem autem. Voluptatem accusantium eius error adipisci quibusdam doloribus.',
      belongs_to: 'Running a Node App',
      created_by: 'tickle122',
      votes: -1,
      created_at: 1468087638932,
    }]

    const input_2 = { 'Running a Node App': 1 }

    const expected = [{
      body: 'Itaque quisquam est similique et est perspiciatis reprehenderit voluptatem autem. Voluptatem accusantium eius error adipisci quibusdam doloribus.',
      article_id: 1,
      author: 'tickle122',
      votes: -1,
      created_at: 1468087638932,
    }]
    expect(modCommentsData(input_1, input_2)).toEqual(expected)
  });

  test('should return a new array of a modified  comments with a article_id property', () => {
    const input_1 = [{
      body: 'Itaque quisquam est similique et est perspiciatis reprehenderit voluptatem autem. Voluptatem accusantium eius error adipisci quibusdam doloribus.',
      belongs_to: 'The People Tracking Every Touch, Pass And Tackle in the World Cup',
      created_by: 'tickle122',
      votes: -1,
      created_at: 1468087638932,
    },
    {
      body: 'Nobis consequatur animi. Ullam nobis quaerat voluptates veniam.',
      belongs_to: 'Making sense of Redux',
      created_by: 'grumpy19',
      votes: 7,
      created_at: 1478813209256,
    }]

    const input_2 = { 'The People Tracking Every Touch, Pass And Tackle in the World Cup': 1, 'Making sense of Redux': 2 }

    const expected = [{
      body: 'Itaque quisquam est similique et est perspiciatis reprehenderit voluptatem autem. Voluptatem accusantium eius error adipisci quibusdam doloribus.',
      article_id: 1,
      author: 'tickle122',
      votes: -1,
      created_at: 1468087638932,
    },
    {
      body: 'Nobis consequatur animi. Ullam nobis quaerat voluptates veniam.',
      article_id: 2,
      author: 'grumpy19',
      votes: 7,
      created_at: 1478813209256,
    }]

    expect(modCommentsData(input_1, input_2)).toEqual(expected)
  });

  test('it should not mutate the input array, and return a new array', () => {
    const input_1 = [{
      body: 'Itaque quisquam est similique et est perspiciatis reprehenderit voluptatem autem. Voluptatem accusantium eius error adipisci quibusdam doloribus.',
      belongs_to: 'Running a Node App',
      created_by: 'tickle122',
      votes: -1,
      created_at: 1468087638932,
    }]

    const input_2 = { 'Running a Node App': 1 }

    modCommentsData(input_1, input_2);
    expect(modCommentsData(input_1, input_2)).not.toBe(input_1);
    expect(input_1).toEqual([{
      body: 'Itaque quisquam est similique et est perspiciatis reprehenderit voluptatem autem. Voluptatem accusantium eius error adipisci quibusdam doloribus.',
      belongs_to: 'Running a Node App',
      created_by: 'tickle122',
      votes: -1,
      created_at: 1468087638932,
    }]);
  });
});