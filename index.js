// task 1
function normaliseData(content) {
  const [, ...data] = content.trim().split('\n');
  return data;
}

function findMessengerWithHighestAverageRating(Data) {
  const messengers = Data.slice(1);
  let highestAvR = 0;
  let highestRatedMessenger = '';
  for (let i = 0; i < messengers.length; i += 1) {
    const [name, developer, playmarketRating, appstoreRating] = messengers[i].split(';');
    const averageRating = (parseFloat(playmarketRating) + parseFloat(appstoreRating)) / 2;
    if (averageRating > highestAvR) {
      highestAvR = averageRating;
      highestRatedMessenger = `General top messenger: ${name}, Owner: ${developer}`;
    }
  }
  return highestRatedMessenger;
}

function getIndDownload(str) {
  const IndDown = parseInt(str.split(';').at(6), 10);
  return IndDown;
}

function getRangeOfDown(data) {
  const down = data.map((download) => getIndDownload(download));
  return [Math.max(...down), Math.min(...down)];
}

function topThreePopularAppsInAustralia(data) {
  const appsData = data.map((str) => {
    const appInfo = str.split(';');
    const name = appInfo.at(0);
    const downloadsInAustralia = parseInt(appInfo.at(5), 10);
    return { name, downloadsInAustralia };
  });
  const sortedApps = appsData.sort((a, b) => b.downloadsInAustralia - a.downloadsInAustralia);
  const topThreeApps = sortedApps.slice(0, 3);
  const appNames = topThreeApps.map((app) => app.name).sort().join(', ');
  return `Top-3 Australia: ${appNames}`;
}

function WorstToTop(Data) {
  function calculateAverageDownloads(downloads) {
    const totalDownloads = downloads.reduce((acc, curr) => acc + parseInt(curr, 10), 0);
    return totalDownloads / downloads.length;
  }

  const apps = Data.map((appData) => {
    const [name, , , , ...downloads] = appData.split(';');
    const averageDownloads = calculateAverageDownloads(downloads);
    return { name, averageDownloads };
  }).sort((a, b) => a.averageDownloads - b.averageDownloads);
  const appNames = apps.map((app) => app.name).join(', ');
  return appNames;
}

function findCompaniesWithMultipleApps(data) {
  const companies = data.reduce((acc, app) => {
    const company = app.split(';')[1];
    if (acc[company]) {
      acc[company] += 1;
    } else {
      acc[company] = 1;
    }
    return acc;
  }, {});
  const result = Object.entries(companies)
    .filter(([, counter]) => counter >= 2)
    .map(([company]) => company);

  return result.join(', ');
}

const tableParsing = (content) => {
  const data = normaliseData(content);
  const HighestAVR = findMessengerWithHighestAverageRating(data);
  console.log(`${HighestAVR}`);
  const [maxCount, minCount] = getRangeOfDown(data);
  console.log(`Download count: Max count: ${maxCount}, Min count: ${minCount}`);
  const top3 = topThreePopularAppsInAustralia(data);
  console.log(`${top3}`);
  const worsttotop = WorstToTop(data);
  console.log(`Top downloads: ${worsttotop}`);
  const CompaniesWithMultipleApps = findCompaniesWithMultipleApps(data);
  console.log(`Top owner: ${CompaniesWithMultipleApps}`);
};

// task 2
function Normalize(content) {
  const contentSplit = content.split('\n');
  return contentSplit;
}
function stackcount(content) {
  const contentSplit = content.split('\n');
  const stack = ['React', 'Angular', 'Vue.js', 'JQuery', 'Backbone.js', 'Node.js', 'Ember.js', 'Meteor'];
  const lowercontentSplit = contentSplit[5].toLowerCase();
  let res = 0;
  const lowerstack = stack.map((item) => item.toLowerCase());
  for (let i = 0; i < stack.length; i += 1) {
    if (lowercontentSplit.includes(lowerstack[i])) {
      res += 1;
    }
  }
  return res;
}
function getNickname(socialString, socialNetwork) {
  const socials = socialString.split(', ');
  for (let i = 0; i < socials.length; i += 1) {
    const parts = socials[i].split(':/');
    const username = parts[parts.length - 1].split('/').pop();
    if (parts[0].includes(socialNetwork)) {
      return username;
    }
  }
  return 'Никнейм не найден';
}

function calculateExperience(startDate, endDate) {
  const start = new Date(startDate.split('.').reverse().join('-'));
  const end = new Date(endDate.split('.').reverse().join('-'));

  let years = end.getFullYear() - start.getFullYear();
  let months = end.getMonth() - start.getMonth();

  if (months < 0) {
    years -= 1;
    months += 12;
  }

  return `${years} years ${months} months`;
}
function findEducation(EdStr) {
  const parts = EdStr.split(';');
  let result = '';
  const EdPlaces = parts.map((part) => {
    const trimmedPart = part.trim();
    return trimmedPart.split(',')[0];
  });
  if (EdPlaces[0].toLowerCase().includes('education:')) {
    EdPlaces[0] = EdPlaces[0].replace(/education:/gi, '').trim();
  }
  const sortedEd = EdPlaces.sort();
  result = sortedEd.join(', ');
  return result;
}

const candidateAssessment = (content) => {
  const Split = Normalize(content);
  console.log(`Job seeker: ${Split[0]}, ${Split[1]}`);
  console.log(`Required stack: ${stackcount(content)}`);
  console.log(`GitHub nickname: ${getNickname(Split.at(4), 'github')}`);
  console.log(`Experience: ${calculateExperience('01.01.2015', '05.06.2022')}`);
  console.log(`Education: ${findEducation(Split.at(7))}`);
};

// task 3
function count(data) {
  let rewcount = 0;
  let nomcount = 0;
  const counter = data.map((first) => {
    if (first.startsWith('Номинация')) {
      nomcount += 1;
    } else {
      rewcount += 1;
    }
    return 1;
  });
  counter.push(1);
  return [rewcount, nomcount];
}

function getMoviesByYear(actorAwards, year) {
  const moviesForYear = actorAwards.filter((award) => award.includes(year));
  const moviesList = moviesForYear.map((award) => award.split('—')[4].trim());
  const uniqueMovies = [...new Set(moviesList)];
  const sortedMovies = uniqueMovies.sort().join(', ');
  return sortedMovies;
}

function calculateAwardPercent(data) {
  let awards = 0;
  let nominations = 0;
  for (let i = 0; i < data.length; i += 1) {
    if (data[i].startsWith('Награда')) {
      awards += 1;
    } else if (data[i].startsWith('Номинация')) {
      nominations += 1;
    }
  }
  const totalAwardsAndNominations = awards + nominations;
  const percentageAwards = (awards / totalAwardsAndNominations) * 100;
  return Math.round(percentageAwards);
}

function mostAwardedMovie(data) {
  const awards = {};
  const nominations = {};
  for (let i = 0; i < data.length; i += 1) {
    const movie = data[i].split('—')[4].trim();
    if (data[i].startsWith('Награда')) {
      awards[movie] = (awards[movie] || 0) + 1;
    } else if (data[i].startsWith('Номинация')) {
      nominations[movie] = (nominations[movie] || 0) + 1;
    }
  }
  const mostSuccessfulMovie = Object.keys(awards).sort().reduce((mostSuccessful, movie) => {
    if (!mostSuccessful || (awards[movie] + (nominations[movie] || 0))
  > (awards[mostSuccessful] + (nominations[mostSuccessful] || 0))) {
      return movie;
    }
    return mostSuccessful;
  }, null);
  return mostSuccessfulMovie;
}

const actorRating = (content) => {
  const norm = Normalize(content);
  const [rewards, nominations] = count(norm);
  console.log(`Awards: Rewards: ${rewards}, Nominations: ${nominations}`);
  console.log(`Movies 2003: ${getMoviesByYear(norm, 2003)}`);
  console.log(`Rewards percent: ${calculateAwardPercent(norm)}%`);
  console.log(`Most successful movie: ${mostAwardedMovie(norm)}`);
  console.log('Awards statisctics: ');
};

export { tableParsing, candidateAssessment, actorRating };