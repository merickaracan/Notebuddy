const bcrypt = require('bcrypt');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();

const dbPath = path.join(__dirname, 'database', 'database.db');
const db = new sqlite3.Database(dbPath);

const run = (sql, params = []) =>
  new Promise((res, rej) =>
    db.run(sql, params, function (err) {
      if (err) rej(err);
      else res(this.lastID);
    })
  );

const PASSWORD = 'Password1!';

const users = [
  { email: 'alice.smith@bath.ac.uk',   name: 'Alice Smith',   lecturer: 0 },
  { email: 'bob.jones@bath.ac.uk',     name: 'Bob Jones',     lecturer: 0 },
  { email: 'chloe.davis@bath.ac.uk',   name: 'Chloe Davis',   lecturer: 0 },
  { email: 'dan.wilson@bath.ac.uk',    name: 'Dan Wilson',    lecturer: 0 },
  { email: 'emma.brown@bath.ac.uk',    name: 'Emma Brown',    lecturer: 1 },
];

const notes = [
  {
    email: 'alice.smith@bath.ac.uk',
    module: 'CM10227',
    note_title: 'Intro to Algorithms',
    note_data: '<h2>Big-O Notation</h2><p>Big-O describes the <strong>upper bound</strong> of an algorithm\'s time complexity. Common complexities:</p><ul><li>O(1) — constant</li><li>O(log n) — logarithmic (e.g. binary search)</li><li>O(n) — linear</li><li>O(n²) — quadratic (e.g. bubble sort)</li></ul><p>Always aim for the lowest complexity feasible for your problem.</p>',
  },
  {
    email: 'alice.smith@bath.ac.uk',
    module: 'CM10228',
    note_title: 'Functional Programming Basics',
    note_data: '<h2>Pure Functions & Immutability</h2><p>A <strong>pure function</strong> always produces the same output for the same input and has no side effects.</p><p>Key concepts: <em>map</em>, <em>filter</em>, <em>reduce</em>, currying, and function composition. Languages: Haskell, Scala, and functional subsets of JavaScript/Python.</p>',
  },
  {
    email: 'bob.jones@bath.ac.uk',
    module: 'CM10227',
    note_title: 'Sorting Algorithms Cheatsheet',
    note_data: '<h2>Common Sorting Algorithms</h2><table><thead><tr><th>Algorithm</th><th>Best</th><th>Avg</th><th>Worst</th></tr></thead><tbody><tr><td>Bubble Sort</td><td>O(n)</td><td>O(n²)</td><td>O(n²)</td></tr><tr><td>Merge Sort</td><td>O(n log n)</td><td>O(n log n)</td><td>O(n log n)</td></tr><tr><td>Quick Sort</td><td>O(n log n)</td><td>O(n log n)</td><td>O(n²)</td></tr></tbody></table><p>Merge Sort is preferred for linked lists; Quick Sort for arrays in practice.</p>',
  },
  {
    email: 'bob.jones@bath.ac.uk',
    module: 'CM10313',
    note_title: 'Database Normalisation',
    note_data: '<h2>Normal Forms</h2><p><strong>1NF</strong>: Atomic values, no repeating groups.<br><strong>2NF</strong>: 1NF + no partial dependencies.<br><strong>3NF</strong>: 2NF + no transitive dependencies.<br><strong>BCNF</strong>: Every determinant is a candidate key.</p><p>Normalisation reduces data redundancy and improves integrity, but can increase query complexity — denormalise carefully for performance.</p>',
  },
  {
    email: 'chloe.davis@bath.ac.uk',
    module: 'CM10228',
    note_title: 'Haskell Type System',
    note_data: '<h2>Types in Haskell</h2><p>Haskell is <strong>statically typed</strong> with type inference. Key ideas:</p><ul><li><code>Int</code>, <code>Integer</code>, <code>Float</code>, <code>Bool</code>, <code>Char</code></li><li>Type classes: <code>Eq</code>, <code>Ord</code>, <code>Show</code>, <code>Num</code></li><li>Polymorphism via type variables: <code>a</code>, <code>b</code></li><li>Maybe monad for null-safe computation</li></ul>',
  },
  {
    email: 'chloe.davis@bath.ac.uk',
    module: 'CM10313',
    note_title: 'SQL Joins Explained',
    note_data: '<h2>SQL Join Types</h2><p><strong>INNER JOIN</strong>: rows matching in both tables.<br><strong>LEFT JOIN</strong>: all left rows + matched right rows (NULL if no match).<br><strong>RIGHT JOIN</strong>: opposite of LEFT JOIN.<br><strong>FULL OUTER JOIN</strong>: all rows from both tables.</p><p>Use <code>ON</code> for join conditions. Avoid Cartesian products — always specify the join condition!</p>',
  },
  {
    email: 'dan.wilson@bath.ac.uk',
    module: 'CM10227',
    note_title: 'Dynamic Programming Notes',
    note_data: '<h2>Dynamic Programming</h2><p>DP solves problems by breaking them into overlapping subproblems. Two approaches:</p><ol><li><strong>Top-down (Memoisation)</strong>: Recursive + cache results.</li><li><strong>Bottom-up (Tabulation)</strong>: Iterative, fill table from base cases up.</li></ol><p>Classic examples: Fibonacci, 0/1 Knapsack, Longest Common Subsequence, Coin Change.</p>',
  },
  {
    email: 'dan.wilson@bath.ac.uk',
    module: 'CM10228',
    note_title: 'Lambda Calculus Introduction',
    note_data: '<h2>Lambda Calculus</h2><p>The theoretical foundation of functional programming. Three constructs:</p><ul><li><strong>Variables</strong>: x</li><li><strong>Abstraction</strong>: λx.M (function definition)</li><li><strong>Application</strong>: M N (applying function M to argument N)</li></ul><p>Beta reduction: (λx.M) N → M[x:=N]. Church numerals encode natural numbers purely in lambda calculus.</p>',
  },
  {
    email: 'emma.brown@bath.ac.uk',
    module: 'CM10313',
    note_title: 'Transactions & ACID Properties',
    note_data: '<h2>ACID in Databases</h2><p><strong>Atomicity</strong>: All operations succeed or none do.<br><strong>Consistency</strong>: DB moves from one valid state to another.<br><strong>Isolation</strong>: Concurrent transactions don\'t interfere.<br><strong>Durability</strong>: Committed changes persist even after crashes.</p><p>Isolation levels: Read Uncommitted → Read Committed → Repeatable Read → Serializable.</p>',
  },
  {
    email: 'emma.brown@bath.ac.uk',
    module: 'CM10227',
    note_title: 'Graph Theory Fundamentals',
    note_data: '<h2>Graph Basics</h2><p>A graph G = (V, E) consists of <strong>vertices</strong> V and <strong>edges</strong> E.</p><ul><li><strong>Directed vs Undirected</strong></li><li><strong>Weighted vs Unweighted</strong></li><li>BFS: shortest path in unweighted graphs</li><li>DFS: cycle detection, topological sort</li><li>Dijkstra\'s: shortest path in weighted graphs</li></ul>',
  },
];

// [rater_email, note_index (0-based), rating]
const ratings = [
  ['bob.jones@bath.ac.uk',   0, 5],
  ['chloe.davis@bath.ac.uk', 0, 4],
  ['dan.wilson@bath.ac.uk',  0, 5],
  ['alice.smith@bath.ac.uk', 2, 4],
  ['chloe.davis@bath.ac.uk', 2, 5],
  ['emma.brown@bath.ac.uk',  2, 4],
  ['alice.smith@bath.ac.uk', 3, 3],
  ['dan.wilson@bath.ac.uk',  3, 4],
  ['bob.jones@bath.ac.uk',   4, 5],
  ['alice.smith@bath.ac.uk', 4, 4],
  ['dan.wilson@bath.ac.uk',  5, 5],
  ['bob.jones@bath.ac.uk',   5, 5],
  ['alice.smith@bath.ac.uk', 6, 4],
  ['chloe.davis@bath.ac.uk', 6, 5],
  ['emma.brown@bath.ac.uk',  6, 5],
  ['alice.smith@bath.ac.uk', 7, 3],
  ['bob.jones@bath.ac.uk',   7, 4],
  ['chloe.davis@bath.ac.uk', 8, 5],
  ['dan.wilson@bath.ac.uk',  8, 4],
  ['alice.smith@bath.ac.uk', 9, 5],
  ['bob.jones@bath.ac.uk',   9, 4],
  ['chloe.davis@bath.ac.uk', 9, 5],
];

// [commenter_email, note_index (0-based), comment]
const suggestions = [
  ['bob.jones@bath.ac.uk',   0, 'Great overview! Could you add amortised analysis examples too?'],
  ['chloe.davis@bath.ac.uk', 0, 'Really clear explanation of Big-O. Space complexity would be a nice addition.'],
  ['alice.smith@bath.ac.uk', 2, 'Merge Sort section is super helpful. Worth mentioning Tim Sort for real-world use.'],
  ['emma.brown@bath.ac.uk',  2, 'The table format makes this really easy to scan during revision!'],
  ['alice.smith@bath.ac.uk', 3, 'Could you show a worked example going from 1NF to 3NF step by step?'],
  ['chloe.davis@bath.ac.uk', 4, 'The Maybe monad part is exactly what I needed before the Haskell lab.'],
  ['dan.wilson@bath.ac.uk',  4, 'Super concise — maybe add a code snippet for a simple type class instance?'],
  ['bob.jones@bath.ac.uk',   5, 'Saved me before the DB exam. FULL OUTER JOIN tip is gold.'],
  ['alice.smith@bath.ac.uk', 6, 'The Knapsack example mention is great — do you have a worked solution somewhere?'],
  ['chloe.davis@bath.ac.uk', 6, 'Finally understand bottom-up vs top-down thanks to this. Clear and concise!'],
  ['alice.smith@bath.ac.uk', 7, 'Church numerals blew my mind. Is there a follow-up note on Y combinators?'],
  ['dan.wilson@bath.ac.uk',  8, 'Really useful for the coursework. Could expand on isolation levels with examples.'],
  ['alice.smith@bath.ac.uk', 9, 'Great intro to graphs. Prim\'s and Kruskal\'s for MSTs would complement this nicely.'],
  ['bob.jones@bath.ac.uk',   9, 'Dijkstra\'s section is very clear. Bellman-Ford comparison would be a bonus.'],
];

async function seed() {
  console.log('🌱 Seeding database...');

  db.run('PRAGMA foreign_keys = OFF');

  // Insert users
  const hash = await bcrypt.hash(PASSWORD, 10);
  for (const u of users) {
    await run(
      `INSERT OR IGNORE INTO user_data (email, name, passkey, lecturer, points) VALUES (?, ?, ?, ?, ?)`,
      [u.email, u.name, hash, u.lecturer, 0]
    );
  }
  console.log(`✅ Inserted ${users.length} users`);

  // Insert notes and collect their IDs
  const noteIds = [];
  for (const n of notes) {
    const id = await run(
      `INSERT INTO notes (email, module, note_title, note_data, verified) VALUES (?, ?, ?, ?, 1)`,
      [n.email, n.module, n.note_title, n.note_data]
    );
    noteIds.push(id);
  }
  console.log(`✅ Inserted ${notes.length} notes`);

  // Insert ratings then recalculate averages
  for (const [rater, noteIdx, rating] of ratings) {
    const noteId = noteIds[noteIdx];
    await run(
      `INSERT OR IGNORE INTO note_ratings (note_id, rater_email, rating) VALUES (?, ?, ?)`,
      [noteId, rater, rating]
    );
  }
  // Recalculate rating averages per note
  await run(`
    UPDATE notes
    SET rating_average = COALESCE(
      (SELECT AVG(rating) FROM note_ratings WHERE note_id = notes.id), 0
    ),
    number_ratings = (
      SELECT COUNT(*) FROM note_ratings WHERE note_id = notes.id
    )
  `);
  console.log(`✅ Inserted ${ratings.length} ratings`);

  // Insert suggestions
  for (const [commenter, noteIdx, text] of suggestions) {
    const noteId = noteIds[noteIdx];
    const noteOwner = notes[noteIdx].email;
    await run(
      `INSERT INTO Suggestions (note_id, commenter_id, suggestion_data, note_owner_id) VALUES (?, ?, ?, ?)`,
      [noteId, commenter, text, noteOwner]
    );
  }
  console.log(`✅ Inserted ${suggestions.length} suggestions`);

  // Update points (1 point per note created + 1 per rating received)
  await run(`
    UPDATE user_data
    SET points = (
      SELECT COUNT(*) FROM notes WHERE notes.email = user_data.email
    ) + (
      SELECT COALESCE(SUM(nr.rating), 0)
      FROM note_ratings nr
      JOIN notes n ON nr.note_id = n.id
      WHERE n.email = user_data.email
    )
  `);
  console.log('✅ Updated user points');

  db.run('PRAGMA foreign_keys = ON');
  db.close();
  console.log('\n🎉 Seed complete! Login with any account using: Password1!');
  console.log('\nAccounts created:');
  users.forEach(u => console.log(`  ${u.lecturer ? '👩‍🏫' : '🎓'} ${u.name} — ${u.email}`));
}

seed().catch(err => {
  console.error('❌ Seed failed:', err.message);
  process.exit(1);
});
