import mongoose, { Schema, Document } from 'mongoose';
import { IWishlist, IWishlistItem } from 'interfaces/IWishlist.js';

const ItemSchema = new Schema({
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    price: {
      type: Number,
    },
    url: {
      type: String,
    },
  });

const WishlistSchema = new Schema({
    creator: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    items: [ItemSchema],
  });

export const Wishlist = mongoose.model<IWishlist>('Wishlist', WishlistSchema);
