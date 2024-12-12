import { connect as connectMongoDB } from 'db/connect';

import { UserModel } from 'db/models/user';
import { JobPostingModel } from 'db/models/jobPosting';

import { faker } from '@faker-js/faker';

const seedDatabase = async () => {
  try {
    await UserModel.deleteMany({});
    await JobPostingModel.deleteMany({});

    // Create fake employee users
    const employees = Array.from({ length: 10 }).map((_, index) => ({
      email: `employee${index + 1}@gmail.com`,
      passwordHash:
        '$2b$10$msV/wfmLJtaGNTJavllEVuON4VjfQt.mbd1rzS6FsAThSiP22NImO',
      role: 'employee',
      fullName: faker.person.fullName() + ` (E${index + 1})`,
      gender: faker.helpers.arrayElement(['male', 'female', 'notSpecified']),
      profilePictureUrl: faker.image.avatar(),
      bio: faker.lorem.paragraph(),
      dateOfBirth: faker.date.past({
        years: 30,
        refDate: new Date(2000, 0, 1),
      }),
      addressCountry: faker.location.country(),
      addressCity: faker.location.city(),
      addressArea: faker.location.street(),
      addressZip: faker.location.zipCode(),
      phone: faker.phone.number(),
      experiences: Array.from({
        length: 3,
      }).map(() => ({
        title: faker.person.jobTitle(),
        company: faker.company.name(),
        description: faker.lorem.sentence(),
        startDate: faker.date.past({ years: 5 }),
        endDate: faker.datatype.boolean()
          ? faker.date.recent({ days: 1 })
          : undefined,
        currentlyActive: faker.datatype.boolean(),
      })),
      skills: faker.helpers.uniqueArray(faker.hacker.adjective, 5),
      isBanned: false,
    }));

    // Create fake employer users
    const employers = Array.from({ length: 10 }).map((_, index) => ({
      email: `employer${index + 1}@gmail.com`,
      passwordHash:
        '$2b$10$msV/wfmLJtaGNTJavllEVuON4VjfQt.mbd1rzS6FsAThSiP22NImO',
      role: 'employer',
      fullName: faker.person.fullName() + ` (R${index + 1})`,
      gender: faker.helpers.arrayElement(['male', 'female', 'notSpecified']),
      profilePictureUrl: faker.image.avatar(),
      bio: faker.lorem.paragraph(),
      dateOfBirth: faker.date.past({
        years: 40,
        refDate: new Date(1990, 0, 1),
      }),
      addressCountry: faker.location.country(),
      addressCity: faker.location.city(),
      addressArea: faker.location.street(),
      addressZip: faker.location.zipCode(),
      phone: faker.phone.number(),
      companyPhone: faker.phone.number(),
      companyPersonName: faker.person.fullName(),
      companyIndustry: faker.company.buzzPhrase(),
      companyCountry: faker.location.country(),
      companyCity: faker.location.city(),
      companyArea: faker.location.street(),
      companyZip: faker.location.zipCode(),
      isBanned: false,
    }));

    const allUsers = [...employees, ...employers];
    const userRecords = await UserModel.insertMany(allUsers);

    // Create fake job postings
    const jobPostings = Array.from({ length: 6 }).map(() => {
      const employer = faker.helpers.arrayElement(
        userRecords.filter((user) => user.role === 'employer'),
      );
      return {
        title: faker.person.jobTitle(),
        description: faker.lorem.paragraph(),
        category: faker.commerce.department(),
        specialism: faker.commerce.productName(),
        jobType: faker.helpers.arrayElement([
          'fullTime',
          'partTime',
          'internship',
          'specificDates',
        ]),
        expLevelRequired: faker.helpers.arrayElement([
          'entry',
          'mid',
          'senior',
        ]),
        qualificationsRequired: faker.helpers.uniqueArray(
          () => faker.company.catchPhrase(),
          3,
        ),
        qualificationsDesired: faker.helpers.uniqueArray(
          () => faker.company.buzzAdjective(),
          3,
        ),
        salaryMode: faker.helpers.arrayElement(['monthly', 'hourly']),
        salary: faker.commerce.price({ min: 0, max: 1000, symbol: '$' }),
        startDate: faker.date.soon(),
        endDate: faker.date.future(),
        benefits: faker.helpers.uniqueArray(
          () => faker.company.buzzPhrase(),
          3,
        ),
        workingLanguage: faker.helpers.arrayElement([
          'English',
          'Spanish',
          'French',
        ]),
        residence: faker.helpers.arrayElement(['yes', 'no', 'allowance']),
        food: faker.helpers.arrayElement([
          'yes',
          'no',
          'oneMeal',
          'twoMeal',
          'allowance',
        ]),
        transport: faker.helpers.arrayElement([
          'required',
          'notRequired',
          'mopedProvided',
          'carProvided',
        ]),
        companyName: employer.companyPersonName,
        companyUsername: employer.email.split('@')[0],
        companyDescription: faker.lorem.sentence(),
        companyWebsite: faker.internet.url(),
        companyCountry: employer.companyCountry,
        companyCity: employer.companyCity,
        companyArea: employer.companyArea,
        companyZip: employer.companyZip,
        companyMapAddress: faker.location.streetAddress(),
        questions: faker.helpers.uniqueArray(faker.lorem.sentence, 3),
        postedAt: faker.date.recent(),
        expireAt: faker.date.future(),
        isActive: true,
        posterId: employer._id,
      };
    });

    await JobPostingModel.insertMany(jobPostings);
  } catch (error) {
    console.error('Error seeding database:', error);
  }
};

async function main() {
  await seedDatabase();
}

connectMongoDB()
  .then(main)
  .then(() => {
    process.exit(0);
  })
  .catch((err) => {
    console.log(err);
    process.exit(1);
  });
