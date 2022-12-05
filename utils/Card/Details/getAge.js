const probs = {
  young: 0.9,
  youngAdult: 0.8,
  adult: 0.6,
  middleAged: 0.4,
  old: 0.3,
  veryOld: 0.2,
  shouldbeDead: 0.1,
};

export default function getAge(min, max) {
  let age = Math.floor(Math.random() * (max - min + 1) + min);
  // Make a loop to test the age. The older is is the harder it is to return the age. Retry if age doesn't pass the test.
  // Simulating dating apps age groups.
  let agePassed = false;
  while (!agePassed) {
    // Age 18-24
    if (age >= 18 && age <= 24) {
      // 90% chance of passing
      if (Math.random() < probs.young) {
        agePassed = true;
      }
    }
    // Age 25-34
    else if (age >= 25 && age <= 34) {
      // 80% chance of passing
      if (Math.random() < probs.youngAdult) {
        agePassed = true;
      }
    }
    // Age 35-44
    else if (age >= 35 && age <= 44) {
      // 70% chance of passing
      if (Math.random() < probs.adult) {
        agePassed = true;
      }
    }
    // Age 45-54
    else if (age >= 45 && age <= 54) {
      // 60% chance of passing
      if (Math.random() < probs.middleAged) {
        agePassed = true;
      }
    }
    // Age 55-64
    else if (age >= 55 && age <= 64) {
      // 50% chance of passing
      if (Math.random() < probs.old) {
        agePassed = true;
      }
    }
    // Age 65-74
    else if (age >= 65 && age <= 74) {
      // 40% chance of passing
      if (Math.random() < probs.veryOld) {
        agePassed = true;
      }
    }
    // Age 75+
    else if (age >= 75) {
      // 30% chance of passing
      if (Math.random() < probs.shouldbeDead) {
        agePassed = true;
      }
    }
    // Age failed
    if (!agePassed) {
      age = Math.floor(Math.random() * (max - min + 1) + min);
    }
  }

  return age;
}
