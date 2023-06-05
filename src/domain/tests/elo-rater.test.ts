import {expectedScores, Ratings, Scores, updateRating} from '../entities/elo-rater';

describe('Testing the elo rater', () => {

    describe('when calculating the expected score of two players', () => {
        const currentRating: Ratings = [
            1500,
            1500
        ];

        test('that the expected score of two players with an identical rating is equal', () => {
            const result = expectedScores(currentRating);

            expect(result[0]).toEqual(result[1]);
            expect(result[0]).toEqual(0.5);
        });

        test('that when first player wins the rating of the first player increases', () => {
            const firstPlayerWins: Scores = [1, 0];

            const [ratingA, ratingB] = updateRating(currentRating, expectedScores(currentRating), firstPlayerWins);

            expect(ratingA).toBeGreaterThan(currentRating[0]);
            expect(ratingB).toBeLessThan(currentRating[1]);
            expect(ratingA).toBeGreaterThan(ratingB);
        });
    });
});
