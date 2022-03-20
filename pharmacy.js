export class Drug {
  constructor(name, expiresIn, benefit) {
    this.name = name;
    this.expiresIn = expiresIn;
    this.benefit = benefit;
  }
}

export class Pharmacy {
  constructor(drugs = []) {
    this.drugs = drugs;
  }

  // je définis des fonctions pour chaque drug avec un traitement particulier en passant le délai jusqu'à l'expiration en argument
  getDafalganBenef(expirationDate) {
    if (expirationDate >= 0) return -2;

    return -4;
  }

  getHerbalTeaBenef(expirationDate) {
    if (expirationDate >= 0) return 1;

    return 2;
  }

  getFervexBenef(expirationDate, fervexBenefice) {
    if (expirationDate < 0) return -fervexBenefice;

    if (0 <= expirationDate && expirationDate <= 5) return 3;

    if (5 < expirationDate && expirationDate <= 10) return 2;

    return 1;
  }

  //mon test allégé
  updateBenefitValue() {
    for (var i = 0; i < this.drugs.length; i++) {
      let drugName = this.drugs[i].name;
      let newDrugExpiration = this.drugs[i].expiresIn - 1;

      // J'écarte Magic Pill sur laquelle on n'a aucune action
      if (drugName === 'Magic Pill') continue;

      // Je commence par la condition la plus générale d'enlever un jour avant la date d'expiration à toutes les drugs
      this.drugs[i].expiresIn = newDrugExpiration;

      //j'insère un switch pour alléger le code
      switch (drugName) {
        case 'Dafalgan':
          this.drugs[i].benefit += this.getDafalganBenef(newDrugExpiration);
          break;

        case 'Herbal Tea':
          this.drugs[i].benefit += this.getHerbalTeaBenef(newDrugExpiration);
          break;

        case 'Fervex':
          this.drugs[i].benefit += this.getFervexBenef(
            newDrugExpiration,
            this.drugs[i].benefit
          );
          break;

        default:
          if (this.drugs[i].expiresIn >= 0)
            this.drugs[i].benefit = this.drugs[i].benefit - 1;
          else this.drugs[i].benefit = this.drugs[i].benefit - 2;
      }
      // j'encadre le benefit dans les valeurs maximales et minimales
      if (this.drugs[i].benefit > 50) {
        this.drugs[i].benefit = 50;
      }
      if (this.drugs[i].benefit < 0) {
        this.drugs[i].benefit = 0;
      }
    }
    return this.drugs;
  }
}
