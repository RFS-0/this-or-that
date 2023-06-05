import {Item} from './item';

export const k = 32;

export type Ratings = [number, number];
export type Scores = [number, number];

export interface CompareItems {
    (items: Item[]): Scores
}

export function expectedScores(ratings: Ratings): Scores {

    const expectedScoreOfA = 1 / (1 + Math.pow(10, (ratings[1] - ratings[0]) / 400));
    const expectedScoreOfB = 1 / (1 + Math.pow(10, (ratings[0] - ratings[1]) / 400));

    return [expectedScoreOfA, expectedScoreOfB];
}

export function updateRating(currentRating: Ratings, expectedScore: Scores, score: Scores) {
    const updatedRatingOfA = currentRating[0] + k * (score[0] - expectedScore[0]);
    const updatedRatingOfB = currentRating[1] + k * (score[1] - expectedScore[1]);
    return [updatedRatingOfA, updatedRatingOfB] as Ratings;
}



