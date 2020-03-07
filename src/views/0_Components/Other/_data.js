export const ReviewData = [
  {
    user: { image: null, username: "username", isFollowing: false },
    photos: [null, null, null],
    foodname: "food-name1",
    foodTitle: "Food Name1",
    address: "City Hall, New York, NY",
    pts: 5,
    isLiked: false,
    isSaved: false,
    likesCount: 3,
    commentsCount: 5,
    updatedAt: new Date()
  },
  {
    user: { image: null, username: "username", isFollowing: false },
    photos: [null, null, null],
    foodname: "food-name2",
    foodTitle: "Food Name2",
    address: "City Hall, New York, NY",
    pts: 5,
    isLiked: false,
    isSaved: false,
    likesCount: 3,
    commentsCount: 5,
    updatedAt: new Date()
  },
  {
    user: { image: null, username: "username", isFollowing: false },
    photos: [null, null, null],
    foodname: "food-name3",
    foodTitle: "Food Name3",
    address: "City Hall, New York, NY",
    pts: 5,
    isLiked: false,
    isSaved: false,
    likesCount: 3,
    commentsCount: 5,
    updatedAt: new Date()
  }
]

export const FoodData = [
  {
    photos: [null, null, null],
    foodname: "food-name1",
    foodTitle: "Food Name1",
    address: "City Hall, New York, NY",
    pts: 5,
    isSaved: false,
    savedCount: 7,
    reviewsCount: 9,
    hasReviewed: false
  },
  {
    photos: [null, null, null],
    foodname: "food-name2",
    foodTitle: "Food Name2",
    address: "City Hall, New York, NY",
    pts: 5,
    isSaved: false,
    savedCount: 7,
    reviewsCount: 9,
    hasReviewed: false
  },
  {
    photos: [null, null, null],
    foodname: "food-name3",
    foodTitle: "Food Name3",
    address: "City Hall, New York, NY",
    pts: 5,
    isSaved: false,
    savedCount: 7,
    reviewsCount: 9,
    hasReviewed: false
  }
]

export const UserSearchData = [
  {
    user: { image: null, username: "username1", isFollowing: false }
  },
  {
    user: { image: null, username: "username2", isFollowing: false }
  },
  {
    user: { image: null, username: "username3", isFollowing: false }
  }
]


export const NotificationData = [
  {
    _id: '1',
    user: {
      username: 'username',
      image: null
    },
    notification: 'liked your review',
    review: {
      foodname: 'food-name',
      foodTitle: 'Beef Noodle Soup',
      username: 'username'
    },
    updatedAt: new Date()
  },
  {
    _id: '2',
    user: {
      username: 'username',
      image: null
    },
    notification: 'commented on your review',
    review: {
      foodname: 'food-name',
      foodTitle: 'A Long Foody Food Name',
      username: 'username'
    },
    updatedAt: new Date()
  },
  {
    _id: '3',
    user: {
      username: 'username',
      image: null
    },
    notification: 'is following you',
    review: null,
    updatedAt: new Date()
  },
  {
    _id: '4',
    user: {
      username: 'username',
      image: null
    },
    notification: 'has a new review',
    review: {
      foodname: 'food-name',
      foodTitle: 'Food Name',
      username: 'username'
    },
    updatedAt: new Date()
  }
]

export const FoodMainData = {
  photos: [null, null, null],
  foodname: "food-name1",
  foodTitle: "Food Name1",
  address: "City Hall, New York, NY",
  pts: 5,
  isSaved: false,
  savedCount: 7,
  reviewsCount: 9,
  hasReviewed: false,

  price: 15,
  tags: [{ _id: 10, name: 'Example Tag1' }, { _id: 11, name: 'Example Tag2' }, { _id: 12, name: 'Example Tag3' }, { _id: 13, name: 'Example Tag4' }],
  ptsTaste: 5,
  ptsAppearance: 5,
  ptsTexture: 5,
  ptsAroma: 5,
  ptsBalance: 5,
  reviews: [
    {
      user: { image: null, username: 'username1' },
      pts: 5,
      likes: 35
    },
    {
      user: { image: null, username: 'username2' },
      pts: 5,
      likes: 35
    }
  ]
}

export const ReviewMainData = {
  user: { image: null, username: "username", isFollowing: false },
  photos: [null, null, null],
  foodname: "food-name1",
  foodTitle: "Food Name1",
  address: "City Hall, New York, NY",
  pts: 5,
  isLiked: false,
  isSaved: false,
  likesCount: 3,
  commentsCount: 5,
  updatedAt: new Date(),

  price: 15,
  tags: [{ _id: 10, name: 'Example Tag1' }, { _id: 11, name: 'Example Tag2' }, { _id: 12, name: 'Example Tag3' }, { _id: 13, name: 'Example Tag4' }],
  ptsTaste: 5,
  ptsAppearance: 5,
  ptsTexture: 5,
  ptsAroma: 5,
  ptsBalance: 5,
  review: "Review of the food dish goes here. You can expect it to be a short but detailed review of the aspects of the food dish. While it may be a bit long, it will cover all the ratings such as taste, appearance, texture, aroma, balance, and other things about the food dish. This is just the beta version, but we will see how reviewers would like to discuss about their favorite food dish.",
  isFlagged: false,
  comments: [
    {
      _id: 123,
      user: { image: null, username: 'username1' },
      body: 'Comment from user. It can be really long, or really short depending on what the user wants to say.',
      isLiked: false,
      likesCount: 5,
      updatedAt: new Date()
    }
  ]
}