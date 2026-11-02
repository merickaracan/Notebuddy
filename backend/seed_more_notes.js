const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const db = new sqlite3.Database(path.join(__dirname, 'database', 'database.db'));

const run = (sql, params = []) =>
  new Promise((res, rej) =>
    db.run(sql, params, function (err) {
      if (err) rej(err);
      else res(this.lastID);
    })
  );

const notes = [
  { email: 'alice.smith@bath.ac.uk',   module: 'CM10227', title: 'Recursion & Stack Frames' },
  { email: 'alice.smith@bath.ac.uk',   module: 'CM10313', title: 'Entity Relationship Diagrams' },
  { email: 'bob.jones@bath.ac.uk',     module: 'CM10228', title: 'Higher Order Functions' },
  { email: 'bob.jones@bath.ac.uk',     module: 'CM10227', title: 'Binary Trees & Traversals' },
  { email: 'chloe.davis@bath.ac.uk',   module: 'CM10227', title: 'Greedy Algorithms Overview' },
  { email: 'chloe.davis@bath.ac.uk',   module: 'CM10313', title: 'Indexing & Query Optimisation' },
  { email: 'dan.wilson@bath.ac.uk',    module: 'CM10313', title: 'Stored Procedures & Triggers' },
  { email: 'dan.wilson@bath.ac.uk',    module: 'CM10227', title: 'Divide and Conquer Strategies' },
  { email: 'emma.brown@bath.ac.uk',    module: 'CM10228', title: 'Monads & Functors' },
  { email: 'emma.brown@bath.ac.uk',    module: 'CM10313', title: 'Concurrency Control in Databases' },
  { email: 'alice.smith@bath.ac.uk',   module: 'CM10228', title: 'Lazy Evaluation in Haskell' },
  { email: 'bob.jones@bath.ac.uk',     module: 'CM10313', title: 'Relational Algebra Cheatsheet' },
  { email: 'chloe.davis@bath.ac.uk',   module: 'CM10228', title: 'Pattern Matching & Guards' },
  { email: 'dan.wilson@bath.ac.uk',    module: 'CM10228', title: 'Tail Recursion & Optimisation' },
  { email: 'emma.brown@bath.ac.uk',    module: 'CM10227', title: 'Complexity Classes: P vs NP' },
];

async function addNotes() {
  console.log('📝 Adding more notes (no content)...');

  const noteIds = [];
  for (const n of notes) {
    const id = await run(
      `INSERT INTO notes (email, module, note_title, note_data, verified) VALUES (?, ?, ?, '', 1)`,
      [n.email, n.module, n.title]
    );
    noteIds.push(id);
    console.log(`  + [${id}] "${n.title}" — ${n.email}`);
  }

  db.close();
  console.log(`\n✅ Added ${notes.length} new notes (existing notes untouched)`);
}

addNotes().catch(err => {
  console.error('❌ Failed:', err.message);
  process.exit(1);
});
