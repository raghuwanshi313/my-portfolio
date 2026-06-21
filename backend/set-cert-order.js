// One-time script to set certificate display order
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '.env') });

await mongoose.connect(`${process.env.MONGODB_URI}/portfolio`);
console.log('Connected to MongoDB');

const db = mongoose.connection.db;
const col = db.collection('certifications');

// Set Web Development Internship as order=1 (FIRST)
await col.updateOne(
    { _id: new mongoose.Types.ObjectId('6a1e63b2ee72a1b6aa29fc23') },
    { $set: { order: 1 } }
);
console.log('✅ Web Development Internship → order 1 (FIRST)');

// Set Business Intelligence as order=2 (SECOND)
await col.updateOne(
    { _id: new mongoose.Types.ObjectId('6a3825c83f1e642698ae4abe') },
    { $set: { order: 2 } }
);
console.log('✅ Business Intelligence → order 2 (SECOND)');

// Set Python as order=3 (THIRD) — set explicitly so DB sort works
await col.updateMany(
    { order: { $exists: false } },
    { $set: { order: 3 } }
);
await col.updateOne(
    { _id: new mongoose.Types.ObjectId('6a3825023f1e642698ae4aba') },
    { $set: { order: 3 } }
);
console.log('✅ Python → order 3 (THIRD)');

// Verify final order
const certs = await col.find({}).sort({ order: 1 }).toArray();
console.log('\n📋 Final order:');
certs.forEach((c, i) => console.log(`  ${i + 1}. ${c.name} (order: ${c.order ?? 999})`));

await mongoose.disconnect();
console.log('\nDone!');
