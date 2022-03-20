import { Drug, Pharmacy } from './pharmacy';

describe('Pharmacy', () => {
  describe('generique', () => {
    // test de base
    it('should decrease the benefit and expiresIn', () => {
      expect(
        new Pharmacy([new Drug('test', 2, 3)]).updateBenefitValue()
      ).toEqual([new Drug('test', 1, 2)]);
    });
    // drug classique quand la date d'expiration est passée
    it('should decrease the benefit and expiresIn', () => {
      expect(
        new Pharmacy([new Drug('test', -2, 3)]).updateBenefitValue()
      ).toEqual([new Drug('test', -3, 1)]);
    });
  });

  describe('Herbal Tea', () => {
    //herbal tea quand la date d'expiration n'est pas passée
    it('should increase the benefit and decrease the expiresIn', () => {
      expect(
        new Pharmacy([new Drug('Herbal Tea', 2, 3)]).updateBenefitValue()
      ).toEqual([new Drug('Herbal Tea', 1, 4)]);
    });
    //herbal tea quand la date d'expiration est passée
    it('should increase the benefit by double and decrease the expiresIn', () => {
      expect(
        new Pharmacy([new Drug('Herbal Tea', -1, 3)]).updateBenefitValue()
      ).toEqual([new Drug('Herbal Tea', -2, 5)]);
    });
  });

  describe('Magic Pill', () => {
    //magic pill dans tous les cas
    it('should always stay the same', () => {
      expect(
        new Pharmacy([new Drug('Magic Pill', 2, 3)]).updateBenefitValue()
      ).toEqual([new Drug('Magic Pill', 2, 3)]);
    });
  });

  describe('Fervex', () => {
    //Fervex quand la date d'expiration est passée
    it('should have a benefit at 0 when expiration date is passed', () => {
      expect(
        new Pharmacy([new Drug('Fervex', 0, 10)]).updateBenefitValue()
      ).toEqual([new Drug('Fervex', -1, 0)]);
    });
    //NOK Fervex quand la date d'expiration est supérieure à 10 jours
    it('should increase the benefit like Herbal tea and decrease the expiresIn', () => {
      expect(
        new Pharmacy([new Drug('Fervex', 12, 3)]).updateBenefitValue()
      ).toEqual([new Drug('Fervex', 11, 4)]);
    });
    //NOK Fervex quand la date d'expiration est supérieure à 5 jours et inférieure à 11 jours
    it('should increase the benefit by double and decrease the expiresIn', () => {
      expect(
        new Pharmacy([new Drug('Fervex', 9, 3)]).updateBenefitValue()
      ).toEqual([new Drug('Fervex', 8, 5)]);
    });
    //NOK Fervex quand la date d'expiration est supérieure à 0 jours et inférieure à 6 jours
    it('should increase the benefit by double and decrease the expiresIn', () => {
      expect(
        new Pharmacy([new Drug('Fervex', 4, 3)]).updateBenefitValue()
      ).toEqual([new Drug('Fervex', 3, 6)]);
    });
  });

  describe('Dafalgan', () => {
    //Dafalgan quand la date d'expiration n'est pas passée
    it('should decrease the benefit by double and decrease the expiresIn', () => {
      expect(
        new Pharmacy([new Drug('Dafalgan', 2, 3)]).updateBenefitValue()
      ).toEqual([new Drug('Dafalgan', 1, 1)]);
    });
    //Dafalgan quand la date d'expiration est passée
    it('should decrease the benefit by double of the double and decrease the expiresIn', () => {
      expect(
        new Pharmacy([new Drug('Dafalgan', -3, 6)]).updateBenefitValue()
      ).toEqual([new Drug('Dafalgan', -4, 2)]);
    });
  });

  describe('Default', () => {
    //NOK le benefit ne peut jamais être négatif
    it('should decrease the benefit and expiresIn', () => {
      expect(
        new Pharmacy([new Drug('test', 10, 0)]).updateBenefitValue()
      ).toEqual([new Drug('test', 9, 0)]);
    });
    //NOK le benefit ne peut jamais être supérieur à 50
    it('should remain at 50 or less', () => {
      expect(
        new Pharmacy([new Drug('Fervex', 9, 49)]).updateBenefitValue()
      ).toEqual([new Drug('Fervex', 8, 50)]);
    });
  });
});
