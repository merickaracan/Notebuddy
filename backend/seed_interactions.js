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

// Short summaries for notes 30-44
const summaries = {
  30: 'Covers how recursive calls build up stack frames, base cases, and how the call stack unwinds on return. Includes a comparison of iterative vs recursive approaches.',
  31: 'An overview of ER diagrams: entities, attributes, relationships, cardinality (1:1, 1:N, M:N), and how to map an ER diagram to a relational schema.',
  32: 'Explains functions that take or return other functions. Covers map, filter, and fold/reduce with examples, and how higher-order functions enable cleaner, reusable code.',
  33: 'Introduces binary trees: nodes, leaves, depth, and height. Covers in-order, pre-order, and post-order traversals, plus BST insert and search operations.',
  34: 'Summarises the greedy paradigm: making locally optimal choices at each step. Covers interval scheduling, Huffman coding, and when greedy works vs when it fails.',
  35: 'Explains B-tree and hash indexing, how the query planner chooses indexes, and tips for writing index-friendly queries using EXPLAIN and EXPLAIN ANALYSE.',
  36: 'Introduces stored procedures for encapsulating SQL logic server-side, and triggers that fire automatically on INSERT/UPDATE/DELETE events. Includes syntax and use cases.',
  37: 'Covers the divide-and-conquer template: split the problem, solve recursively, combine results. Worked examples include Merge Sort, Binary Search, and Strassen\'s algorithm.',
  38: 'Explains functors as mappable containers and monads as a design pattern for chaining computations. Uses Maybe and IO as concrete examples in Haskell.',
  39: 'Covers locking protocols (shared/exclusive), deadlock detection and prevention, timestamp ordering, and optimistic concurrency control in relational databases.',
  40: 'Describes lazy evaluation (call-by-need): expressions only evaluated when required. Covers infinite lists, thunks, and how laziness interacts with I/O in Haskell.',
  41: 'A concise reference for relational algebra operators: selection (σ), projection (π), union (∪), difference (−), Cartesian product (×), and natural join (⋈).',
  42: 'Covers Haskell pattern matching on lists, tuples, and custom data types, plus guard expressions for multi-condition branching. Includes worked function definitions.',
  43: 'Explains how tail-recursive functions allow compilers to perform tail-call optimisation (TCO), converting recursion to a loop. Contrasts with non-tail recursion.',
  44: 'Introduces complexity classes P (polynomial) and NP (non-deterministic polynomial), the P vs NP open problem, NP-completeness, and key examples like SAT and 3-SAT.',
};

// [rater_email, note_id, rating]
const ratings = [
  ['bob.jones@bath.ac.uk',     30, 4],
  ['chloe.davis@bath.ac.uk',   30, 5],
  ['alice.smith@bath.ac.uk',   31, 3],
  ['emma.brown@bath.ac.uk',    31, 5],
  ['alice.smith@bath.ac.uk',   32, 4],
  ['dan.wilson@bath.ac.uk',    32, 5],
  ['emma.brown@bath.ac.uk',    32, 4],
  ['alice.smith@bath.ac.uk',   33, 5],
  ['chloe.davis@bath.ac.uk',   33, 4],
  ['emma.brown@bath.ac.uk',    33, 5],
  ['bob.jones@bath.ac.uk',     34, 4],
  ['alice.smith@bath.ac.uk',   34, 3],
  ['dan.wilson@bath.ac.uk',    35, 5],
  ['alice.smith@bath.ac.uk',   35, 4],
  ['bob.jones@bath.ac.uk',     35, 5],
  ['alice.smith@bath.ac.uk',   36, 4],
  ['chloe.davis@bath.ac.uk',   36, 3],
  ['bob.jones@bath.ac.uk',     37, 5],
  ['chloe.davis@bath.ac.uk',   37, 5],
  ['emma.brown@bath.ac.uk',    37, 4],
  ['alice.smith@bath.ac.uk',   38, 4],
  ['dan.wilson@bath.ac.uk',    38, 5],
  ['bob.jones@bath.ac.uk',     39, 3],
  ['chloe.davis@bath.ac.uk',   39, 4],
  ['alice.smith@bath.ac.uk',   39, 5],
  ['bob.jones@bath.ac.uk',     40, 4],
  ['dan.wilson@bath.ac.uk',    40, 3],
  ['chloe.davis@bath.ac.uk',   41, 5],
  ['emma.brown@bath.ac.uk',    41, 5],
  ['alice.smith@bath.ac.uk',   41, 4],
  ['bob.jones@bath.ac.uk',     42, 4],
  ['dan.wilson@bath.ac.uk',    42, 5],
  ['alice.smith@bath.ac.uk',   43, 5],
  ['chloe.davis@bath.ac.uk',   43, 4],
  ['emma.brown@bath.ac.uk',    43, 5],
  ['bob.jones@bath.ac.uk',     44, 5],
  ['chloe.davis@bath.ac.uk',   44, 5],
  ['dan.wilson@bath.ac.uk',    44, 4],
  ['alice.smith@bath.ac.uk',   44, 5],
];

// [commenter_email, note_id, note_owner_email, comment]
const suggestions = [
  ['chloe.davis@bath.ac.uk',  30, 'alice.smith@bath.ac.uk',  'Really clear breakdown of the call stack. Would love a visual diagram of the frames unwinding!'],
  ['dan.wilson@bath.ac.uk',   30, 'alice.smith@bath.ac.uk',  'The base case examples helped a lot. Could you add a note on stack overflow risks?'],
  ['bob.jones@bath.ac.uk',    31, 'alice.smith@bath.ac.uk',  'The cardinality section is super clear. A worked hospital/patient example would be perfect here.'],
  ['dan.wilson@bath.ac.uk',   31, 'alice.smith@bath.ac.uk',  'Mapping ER to relational schema is explained well. Worth adding weak entities too.'],
  ['chloe.davis@bath.ac.uk',  32, 'bob.jones@bath.ac.uk',   'The fold/reduce explanation finally clicked for me after reading this. Great note!'],
  ['emma.brown@bath.ac.uk',   32, 'bob.jones@bath.ac.uk',   'Good overview. Partial application and currying would complement this nicely.'],
  ['alice.smith@bath.ac.uk',  33, 'bob.jones@bath.ac.uk',   'BST insert is well explained. Could you add deletion — it trips people up in exams.'],
  ['dan.wilson@bath.ac.uk',   33, 'bob.jones@bath.ac.uk',   'In-order traversal example was exactly what I needed for the coursework revision.'],
  ['alice.smith@bath.ac.uk',  34, 'chloe.davis@bath.ac.uk', 'Good intro to greedy. A worked Huffman tree would make this note complete.'],
  ['emma.brown@bath.ac.uk',   34, 'chloe.davis@bath.ac.uk', 'The section on when greedy fails is the most useful part — keep that in!'],
  ['alice.smith@bath.ac.uk',  35, 'chloe.davis@bath.ac.uk', 'EXPLAIN tip is very practical. Composite indexes and covering indexes would be a great add.'],
  ['bob.jones@bath.ac.uk',    35, 'chloe.davis@bath.ac.uk', 'Really useful for the DB coursework. The query planner section saved me a lot of time.'],
  ['alice.smith@bath.ac.uk',  36, 'dan.wilson@bath.ac.uk',  'Good syntax overview. A BEFORE vs AFTER trigger comparison would help clarify usage.'],
  ['emma.brown@bath.ac.uk',   36, 'dan.wilson@bath.ac.uk',  'Worth mentioning that triggers can be hard to debug — a note on testing them would help.'],
  ['alice.smith@bath.ac.uk',  37, 'dan.wilson@bath.ac.uk',  'Strassen example is a great touch. The recurrence relation walkthrough is really clear.'],
  ['chloe.davis@bath.ac.uk',  37, 'dan.wilson@bath.ac.uk',  'Best divide and conquer notes I\'ve found. The combine step explanation is excellent.'],
  ['bob.jones@bath.ac.uk',    38, 'emma.brown@bath.ac.uk',  'The IO monad section finally made it click for me. Maybe you could add Either next?'],
  ['alice.smith@bath.ac.uk',  38, 'emma.brown@bath.ac.uk',  'This is the clearest monad explanation I\'ve read. The do-notation comparison would be a bonus.'],
  ['alice.smith@bath.ac.uk',  39, 'emma.brown@bath.ac.uk',  'Deadlock prevention section is very thorough. A comparison table of isolation levels would top it off.'],
  ['dan.wilson@bath.ac.uk',   39, 'emma.brown@bath.ac.uk',  'Optimistic concurrency control explanation is great. Real-world MVCC examples would add more depth.'],
  ['alice.smith@bath.ac.uk',  40, 'alice.smith@bath.ac.uk', 'The infinite lists example is mind-bending in the best way. takeWhile use cases would be a nice add.'],
  ['dan.wilson@bath.ac.uk',   40, 'alice.smith@bath.ac.uk', 'Thunks are explained really clearly here. How does this interact with seq and deepseq?'],
  ['alice.smith@bath.ac.uk',  41, 'bob.jones@bath.ac.uk',   'This is my go-to revision sheet for relational algebra. Theta join vs natural join distinction would complete it.'],
  ['dan.wilson@bath.ac.uk',   41, 'bob.jones@bath.ac.uk',   'Brilliant cheatsheet. Division operator (÷) is missing though — very common in exam questions.'],
  ['alice.smith@bath.ac.uk',  42, 'chloe.davis@bath.ac.uk', 'Guards section is very clear. Wildcard patterns and as-patterns would be a useful addition.'],
  ['bob.jones@bath.ac.uk',    42, 'chloe.davis@bath.ac.uk', 'This helped me get through the Haskell lab. The custom data type examples are spot on.'],
  ['alice.smith@bath.ac.uk',  43, 'dan.wilson@bath.ac.uk',  'TCO explanation is the clearest I\'ve seen. A benchmark showing stack depth difference would be great.'],
  ['chloe.davis@bath.ac.uk',  43, 'dan.wilson@bath.ac.uk',  'Accumulator pattern comparison is really well done. Used this directly in the lab!'],
  ['bob.jones@bath.ac.uk',    44, 'emma.brown@bath.ac.uk',  'NP-completeness section is excellent. Cook\'s theorem mention would be the cherry on top.'],
  ['dan.wilson@bath.ac.uk',   44, 'emma.brown@bath.ac.uk',  'The SAT and 3-SAT examples make this very concrete. Approximation algorithms as a follow-up would be great.'],
];

async function run_seed() {
  console.log('🌱 Adding content, ratings, and suggestions for notes 30–44...\n');

  // Update summaries
  for (const [id, content] of Object.entries(summaries)) {
    await run('UPDATE notes SET note_data = ? WHERE id = ?', [content, parseInt(id)]);
  }
  console.log(`✅ Updated content for ${Object.keys(summaries).length} notes`);

  // Insert ratings
  let ratingCount = 0;
  for (const [rater, noteId, rating] of ratings) {
    try {
      await run(
        'INSERT OR IGNORE INTO note_ratings (note_id, rater_email, rating) VALUES (?, ?, ?)',
        [noteId, rater, rating]
      );
      ratingCount++;
    } catch (e) {
      console.warn(`  Skipped rating: ${e.message}`);
    }
  }
  console.log(`✅ Inserted ${ratingCount} ratings`);

  // Recalculate averages
  await run(`
    UPDATE notes
    SET rating_average = COALESCE((SELECT AVG(rating) FROM note_ratings WHERE note_id = notes.id), 0),
        number_ratings = (SELECT COUNT(*) FROM note_ratings WHERE note_id = notes.id)
    WHERE id >= 30
  `);
  console.log('✅ Recalculated rating averages');

  // Insert suggestions
  let suggestionCount = 0;
  for (const [commenter, noteId, owner, text] of suggestions) {
    await run(
      'INSERT INTO Suggestions (note_id, commenter_id, suggestion_data, note_owner_id) VALUES (?, ?, ?, ?)',
      [noteId, commenter, text, owner]
    );
    suggestionCount++;
  }
  console.log(`✅ Inserted ${suggestionCount} suggestions`);

  // Update points for all users
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

  db.close();
  console.log('\n🎉 Done!');
}

run_seed().catch(err => {
  console.error('❌ Failed:', err.message);
  process.exit(1);
});
