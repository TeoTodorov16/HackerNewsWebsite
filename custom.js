var apiTopStories = "https://hacker-news.firebaseio.com/v0/topstories.json";
var contentBox = document.querySelector("#contentBox");
var stories = [];
var users = [];
var storyList = document.querySelector("#storyList");

var app = {
  init: () => {
    app.fetchTopStories();
  },
  fetchTopStories: () => {
    fetch(apiTopStories)
      .then(response => response.json())
      .then(data => {
        // show top 10 stories
        var store = data.slice(0,10);
        store.forEach((item) => {
          app.fetchOneStory(item);
        })
      })
    setTimeout(app.finish, 1000);
    setTimeout(app.render, 1000);
  },
  fetchOneStory: (id) => {
    var target1 = "https://hacker-news.firebaseio.com/v0/item/" + id + ".json";
    fetch(target1)
      .then(response => response.json())
      .then(data => {
        stories.push({
          title: data.title,
          url: data.url,
          author: data.by,
          time: data.time,
          score: data.score
        });
      })
  },
  render: () => {
    stories.forEach((story) => {
      // Adding card
      var card = document.createElement("div")
      card.className = "col-md-4 my-3";
      storyList.appendChild(card);
      // Adding inner card
      var inner = document.createElement("div")
      inner.className = "col-md-12 h-100 item";
      card.appendChild(inner);
      // Adding author
      var authors = document.createElement("p")
      authors.className = "hn-author";
      authors.textContent = "By " + story.author;
      inner.appendChild(authors);
      // Adding story timestamp
      let unix_timestamp = story.time
      var date = new Date(unix_timestamp * 1000);
      var hours = date.getHours();
      var minutes = "0" + date.getMinutes();
      var seconds = "0" + date.getSeconds();
      var formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
      var timestamp = document.createElement("p")
      timestamp.className = "hn-timestamp";
      timestamp.textContent = "Published " + formattedTime;
      inner.appendChild(timestamp);
      // Adding story title with URL
      var link = document.createElement("a");
      link.className = "hn-title";
      link.href = story.url;
      link.textContent = story.title;
      link.target= "_blank";
      inner.appendChild(link);
      // Adding story score
      var score = document.createElement("p")
      score.className = "hn-score";
      score.textContent = "▲ " + story.score;
      inner.appendChild(score);
    })
  },
  finish: () => {
    console.log("Top stories", stories);
  }
}

function sortPosts() {
  stories.sort(function(a, b){return a-b});
  document.getElementById("storyList").innerHTML = stories;
}

app.init();