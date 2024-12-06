/*import { connect as connectMongoDB } from 'db/connect';

import {
  User,
  Financials,
  IPopulatedUser,
  IPopulatedFinancials,
  FinancialRow,
} from 'db/models';

async function findUser() {
  const user = await User.findOne({})
    .populate<IPopulatedUser<IPopulatedFinancials>>({
      path: 'financials',
      populate: [
        { path: 'incomes' },
        { path: 'expenses' },
        { path: 'savings' },
      ],
    })
    .orFail();

  console.log(JSON.stringify(user.toJSON(), null, 2));
}

async function createUser() {
  await Promise.all([
    User.deleteMany({}),
    Financials.deleteMany({}),
    FinancialRow.deleteMany({}),
  ]);

  const financials = new Financials({
    year: 2024,
  });

  await financials.save();

  const user = new User({
    email: 'user1@gmail.com',
    passwordHash:
      '$2b$10$qgAFAqGQCYHX3Lil2E0c1.O7ACOzBK6fHpIdZ5Am35rZOrA3.SP6K',
    financials: [financials],
  });

  {
    const row = new FinancialRow({
      label: 'Test Row',
    });

    await row.save();

    await Financials.findOneAndUpdate(
      { _id: financials._id },
      { $push: { incomes: row } },
    );
  }

  await user.save();
}

async function main() {
  await createUser();
  await findUser();
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
*/
