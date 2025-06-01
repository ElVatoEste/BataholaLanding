import {ImageItem} from "../ImageItem";

export interface NewsImage extends ImageItem{
    title: string;
    description: string;
    url?: string;

}