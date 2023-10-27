import Tour from '../models/Tour.js'
import Review from '../models/Review.js'
import jwt from 'jsonwebtoken'

export const createReview = async (req, res) => {
  const tourId = req.params.tourId
  const username = JSON.parse(req.body?.user).username
  const { reviewText, tourRating } = req.body
  const newReview = new Review({
    productId: tourId,
    reviewText,
    username,
    rating: tourRating
  })

  try {
    const savedReview = await newReview.save()

    await Tour.findByIdAndUpdate(tourId, {
      $push: { reviews: savedReview._id }
    })

    res
      .status(200)
      .json({ success: true, message: 'Review submitted', data: savedReview })
  } catch (err) {
    console.log(err)
    res.status(500).json({
      success: false,
      message: 'Failed to submit'
    })
  }
}
