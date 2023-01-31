import { Document } from 'mongoose';

export interface IWishlistItem {
    name: string;
    description?: string;
    price?: number;
    url?: string;
}

export interface IWishlist extends Document {
    creator: string;
    name: string;
    items: IWishlistItem[];
}

export interface IWishlistOptions {
    name?: string;
    items?: IWishlistItem[];
}