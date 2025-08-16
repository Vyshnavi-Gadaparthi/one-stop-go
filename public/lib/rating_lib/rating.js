function addRatingStars(container, rating) { 
    var ratingBlock = document.createElement("div");
    ratingBlock.setAttribute("class", 'ratingBlock');
    var fullStarsCount = parseInt(rating);
    var halfStarCount = 0;
    for (var i = 1;  i <= fullStarsCount; i++) {
        var fullstarDiv = document.createElement("div");
        fullstarDiv.setAttribute("class", 'fullStar');
        ratingBlock.append(fullstarDiv);
    }
    if (rating % 1 != 0) {
        halfStarCount++;
        var halfRatingDiv = document.createElement("div");
        halfRatingDiv.setAttribute("class", 'halfStar');
        ratingBlock.append(halfRatingDiv);
    }
    var disableStarCount = 5 - (fullStarsCount + halfStarCount);
    for (var i = 1;  i <= disableStarCount; i++) {
        var disableStar = document.createElement("div");
        disableStar.setAttribute("class", 'disableStar');
        ratingBlock.append(disableStar);
    }

    document.querySelector(container).append(ratingBlock);

    
}

