/**
 * Hotel
 * -----
 * Interface that defines the structure of a Hotel object.
 * Used to model hotel data throughout the application.
 */
export interface Hotel {
  /** Unique identifier for the hotel */
  id: string;
  /** Display name of the hotel (e.g. "Hilton Barcelona") */
  name: string;
  /** URL of the hotel's main image (used in card view) */
  image: string;
  /** Full street address of the hotel */
  address: string;
  /** Star classification from 1 to 5 (e.g. 3 stars, 5 stars) */
  stars: number;
  /** Average user rating (can include decimals, from 0 to 5) */
  rate: number;
  /** Price per night in euros (e.g. 150 for €150) */
  price: number;
}
