
  var config = {
      apiKey: "AIzaSyAEtPbJfTJKFR_MF_5GM1YCKRyvBkoMaEE",
      authDomain: "timetrackerdm.firebaseapp.com",
      databaseURL: "https://timetrackerdm.firebaseio.com",
      projectId: "timetrackerdm",
      storageBucket: "",
      messagingSenderId: "958236399042"
  };
  firebase.initializeApp(config);

  var db = firebase.database();
  var name = "";
  var role = "";
  var start = "";
  var rate = "";

  $("#addEmployee").on("click", function(e) {
      e.preventDefault();

      name = $("#nameInput").val().trim();
      role = $("#roleInput").val().trim();
      start = $("#startInput").val().trim();
      rate = $("#rateInput").val().trim();

      db.ref().push({
          name:name,
          role:role,
          start:start,
          rate:rate,
          dateAdded: firebase.database.ServerValue.TIMESTAMP
      });
      $("#nameInput").val("");
      $("#roleInput").val("");
      $("#startInput").val("");
      $("#rateInput").val("");
  });

  db.ref().orderByChild("dateAdded").limitToLast(3).on("child_added", function(childSnapshot, prevChildKey) {

      var tName = childSnapshot.val().name;
      var tRole = childSnapshot.val().role;
      var tStart = childSnapshot.val().start;
      var tRate = childSnapshot.val().rate;

      console.log(tName);
      console.log(tRole);
      console.log(tStart);
      console.log(tRate);

      // $(".schedTable").append("<tr>" + "<td>" + tName + "</td>" + "<td>" + tRole + "</td>" + "<td>" + tStart + "</td>" + "<td>MonthsWorked</td>" + "<td>" + tRate + "</td>" + "<td>Total Billed</td>" + "</tr>");


      // Prettify the employee start
      var tStartPretty = moment.unix(tStart).format("MM/DD/YY");
      console.log("Pretty Employee Start Date: " + tStartPretty);

      // Calculate the months worked using hardcore math
      // To calculate the months worked
      var empMonths = moment().diff(moment.unix(tStart, "X"), "months");
      console.log("Months worked: " + empMonths);

      // Calculate the total billed rate
      var empBilled = empMonths * tRate;
      console.log(empBilled);

      // Add each train's data into the table
      $(".schedTable").append("<tr><td>" + tName + "</td><td>" + tRole + "</td><td>" +
      tStartPretty + "</td><td>" + empMonths + "</td><td>" + tRate + "</td><td>" + "$" + empBilled + "</td></tr>");



//GRABBED FROM EXERCISE IN CLASS:
      // Assumptions
          // var tFrequency = 3;
          // // Time is 3:30 AM
          // var firstTime = "03:30";
          // // First Time (pushed back 1 year to make sure it comes before current time)
          // var firstTimeConverted = moment(firstTime, "hh:mm").subtract(1, "years");
          // console.log(firstTimeConverted);
          //
          // // Current Time
          // var currentTime = moment();
          // console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));
          //
          // // Difference between the times
          // var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
          // console.log("DIFFERENCE IN TIME: " + diffTime);
          //
          // // Time apart (remainder)
          // var tRemainder = diffTime % tFrequency;
          // console.log(tRemainder);
          //
          // // Minute Until Train
          // var tMinutesTillTrain = tFrequency - tRemainder;
          // console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);
          //
          // // Next Train
          // var nextTrain = moment().add(tMinutesTillTrain, "minutes");
          // console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));
  })
