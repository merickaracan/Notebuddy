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

const users = [
  'alice.smith@bath.ac.uk',
  'bob.jones@bath.ac.uk',
  'chloe.davis@bath.ac.uk',
  'dan.wilson@bath.ac.uk',
  'emma.brown@bath.ac.uk',
];

// title, module code, owner (index into users), content summary
const notes = [
  // ── Machine Learning (CM22009) ── 8 notes
  { title: 'Supervised vs Unsupervised Learning',   module: 'CM22009', owner: 0, content: 'Compares the two main ML paradigms. Supervised learning uses labelled data to learn a mapping from inputs to outputs; unsupervised learning finds hidden structure in unlabelled data. Covers regression, classification, clustering, and dimensionality reduction as concrete examples of each.' },
  { title: 'Linear Regression & Gradient Descent',  module: 'CM22009', owner: 1, content: 'Derives the mean-squared-error cost function for linear regression and explains how gradient descent iteratively updates weights to minimise it. Includes learning-rate selection, convergence criteria, and the difference between batch, mini-batch, and stochastic variants.' },
  { title: 'Logistic Regression & Decision Boundary',module: 'CM22009', owner: 2, content: 'Explains how logistic regression uses the sigmoid function to output class probabilities. Covers the log-loss cost function, the decision boundary, multi-class extension via softmax, and when to prefer logistic regression over a neural network.' },
  { title: 'Decision Trees & Random Forests',        module: 'CM22009', owner: 3, content: 'Introduces CART decision trees: splitting criteria (Gini impurity, information gain), stopping conditions, and pruning. Extends to Random Forests — an ensemble of trees trained on bootstrap samples — and discusses bias-variance trade-off and feature importance.' },
  { title: 'k-Nearest Neighbours (kNN)',             module: 'CM22009', owner: 4, content: 'Describes the kNN algorithm for classification and regression: storing all training points and predicting by majority vote (or average) among the k closest neighbours. Covers distance metrics, the curse of dimensionality, and how to choose k via cross-validation.' },
  { title: 'Support Vector Machines',                module: 'CM22009', owner: 0, content: 'Explains maximum-margin classifiers: finding the hyperplane that maximises the margin between classes. Covers support vectors, the soft-margin formulation for non-separable data, and the kernel trick (RBF, polynomial) for non-linear boundaries.' },
  { title: 'Neural Network Fundamentals',            module: 'CM22009', owner: 1, content: 'Covers the perceptron, multi-layer networks, activation functions (ReLU, sigmoid, tanh), forward propagation, and backpropagation. Explains vanishing gradients and how modern initialisations (Xavier, He) and batch normalisation address them.' },
  { title: 'Cross-Validation & Model Evaluation',   module: 'CM22009', owner: 2, content: 'Details k-fold and stratified cross-validation for unbiased model evaluation. Explains precision, recall, F1, ROC-AUC, and confusion matrices. Discusses overfitting, underfitting, and how regularisation (L1/L2) and dropout help generalisation.' },

  // ── Foundations & Frontiers of ML (CM22016) ── 5 notes
  { title: 'Principal Component Analysis (PCA)',     module: 'CM22016', owner: 3, content: 'Shows how PCA projects high-dimensional data onto the directions of maximum variance via eigendecomposition of the covariance matrix. Covers explained variance ratio, scree plots, and practical use in pre-processing before classification.' },
  { title: 'K-Means Clustering',                    module: 'CM22016', owner: 4, content: 'Explains the K-means algorithm: initialise centroids, assign each point to the nearest centroid, recompute centroids, repeat until convergence. Discusses the elbow method for choosing K, sensitivity to initialisation (K-means++), and limitations with non-convex clusters.' },
  { title: 'Bias-Variance Trade-off',               module: 'CM22016', owner: 0, content: 'Decomposes prediction error into bias (systematic error from model assumptions), variance (sensitivity to training data), and irreducible noise. Shows how model complexity shifts the trade-off and how ensemble methods reduce variance without increasing bias.' },
  { title: 'Regularisation: L1 vs L2',              module: 'CM22016', owner: 1, content: 'Compares Lasso (L1) and Ridge (L2) regularisation. L1 produces sparse weights by driving small coefficients to zero (useful for feature selection); L2 shrinks all weights smoothly. Elastic Net combines both. Covers tuning the regularisation hyperparameter via CV.' },
  { title: 'Feature Engineering & Selection',       module: 'CM22016', owner: 2, content: 'Covers creating informative features: polynomial expansion, interaction terms, normalisation vs standardisation, and encoding categoricals (one-hot, target encoding). Feature selection methods: filter (correlation, chi-squared), wrapper (RFE), and embedded (LASSO, tree importances).' },

  // ── Bayesian Machine Learning (CM32024) ── 4 notes
  { title: 'Bayes Theorem & Prior/Posterior',       module: 'CM32024', owner: 3, content: 'Reviews Bayes theorem in the context of ML: prior belief over parameters, likelihood of observed data, and the posterior as the updated belief. Explains conjugate priors (Beta-Binomial, Gaussian-Gaussian) and why they simplify posterior computation.' },
  { title: 'Gaussian Processes',                    module: 'CM32024', owner: 4, content: 'Introduces GPs as distributions over functions. Covers the kernel (covariance) function, the GP prior and posterior, posterior mean and variance as prediction and uncertainty estimates, and hyperparameter optimisation via marginal likelihood.' },
  { title: 'Variational Inference',                 module: 'CM32024', owner: 0, content: 'Explains variational inference as an optimisation-based alternative to MCMC. Defines the ELBO (evidence lower bound) and KL divergence. Covers mean-field approximation and the reparameterisation trick used in variational autoencoders.' },
  { title: 'Markov Chain Monte Carlo (MCMC)',        module: 'CM32024', owner: 1, content: 'Describes MCMC methods for sampling from intractable posterior distributions. Covers the Metropolis-Hastings algorithm, Gibbs sampling, convergence diagnostics (R-hat, trace plots), and when to prefer MCMC over variational inference.' },

  // ── Reinforcement Learning (CM32032) ── 4 notes
  { title: 'Markov Decision Processes',             module: 'CM32032', owner: 2, content: 'Formalises RL problems as MDPs: states, actions, transition probabilities, rewards, and discount factor γ. Covers the Bellman equations for the value function V(s) and action-value function Q(s,a), and the policy and value iteration algorithms.' },
  { title: 'Q-Learning & Temporal Difference',      module: 'CM32032', owner: 3, content: 'Explains TD learning as a way to estimate value functions without a model. Covers Q-learning (off-policy), SARSA (on-policy), and the ε-greedy exploration strategy. Discusses convergence guarantees and why Q-learning works on stochastic environments.' },
  { title: 'Deep Q-Networks (DQN)',                 module: 'CM32032', owner: 4, content: 'Shows how DQN approximates Q-values with a neural network. Key ideas: experience replay (breaking correlation between updates), a separate target network (stabilising training), and reward clipping. Discusses limitations and extensions (Double DQN, Dueling DQN).' },
  { title: 'Policy Gradient Methods',               module: 'CM32032', owner: 0, content: 'Introduces REINFORCE and the policy gradient theorem: directly optimise the policy π(a|s;θ) by gradient ascent on expected return. Covers variance reduction via baseline subtraction, actor-critic methods, and modern algorithms (PPO, A3C).' },

  // ── Algorithms & Complexity (CM22008) ── 3 notes
  { title: 'NP-Hardness & Reductions',              module: 'CM22008', owner: 1, content: 'Explains polynomial-time reductions as the tool for proving NP-hardness. Walks through the 3-SAT → Independent Set reduction step by step, then covers the Cook-Levin theorem and why finding a polynomial algorithm for any NP-complete problem would solve all of NP.' },
  { title: 'Amortised Analysis',                    module: 'CM22008', owner: 2, content: 'Introduces amortised analysis as a way to bound the average cost of operations in a sequence. Covers the aggregate method, accounting method, and potential method. Applied to dynamic arrays (doubling strategy) and splay trees.' },
  { title: 'Network Flow & Max-Flow Min-Cut',       module: 'CM22008', owner: 3, content: 'Defines flow networks and the max-flow problem. Covers the Ford-Fulkerson method, augmenting paths in residual graphs, and the Edmonds-Karp BFS variant with O(VE²) complexity. States and applies the max-flow min-cut theorem.' },

  // ── Software Engineering (CM22007) ── 3 notes
  { title: 'Agile & Scrum Methodology',             module: 'CM22007', owner: 4, content: 'Summarises the Agile Manifesto principles and the Scrum framework: sprints, sprint planning, daily standups, sprint review and retrospective. Covers user stories, story points, velocity, and how to manage the product backlog.' },
  { title: 'Design Patterns: SOLID Principles',     module: 'CM22007', owner: 0, content: 'Explains each SOLID principle with concrete examples: Single Responsibility, Open/Closed, Liskov Substitution, Interface Segregation, and Dependency Inversion. Shows how violating them leads to brittle, hard-to-test code.' },
  { title: 'Testing Strategies: Unit to E2E',       module: 'CM22007', owner: 1, content: 'Maps the testing pyramid: unit tests (fast, isolated), integration tests (verify component interactions), and E2E tests (full user flows). Covers mocking vs stubbing, test coverage metrics, and when to prefer each layer.' },
];

// cross-user ratings: [rater_index, note_index, rating]
const ratingRules = [
  [1,0,5],[2,0,4],[3,0,5],
  [0,1,4],[2,1,5],[4,1,4],
  [0,2,5],[3,2,4],[4,2,5],
  [0,3,4],[1,3,5],[4,3,4],
  [1,4,3],[2,4,4],[3,4,5],
  [0,5,5],[2,5,4],[4,5,5],
  [0,6,4],[3,6,5],[4,6,5],
  [1,7,5],[3,7,4],[4,7,5],
  [0,8,4],[1,8,5],[2,8,4],
  [0,9,5],[2,9,4],[3,9,5],
  [1,10,4],[3,10,5],[4,10,3],
  [0,11,5],[2,11,4],[4,11,5],
  [1,12,4],[3,12,5],[4,12,4],
  [0,13,5],[2,13,5],[4,13,4],
  [1,14,4],[2,14,5],[3,14,5],
  [0,15,5],[2,15,4],[4,15,5],
  [1,16,4],[3,16,5],[4,16,4],
  [0,17,5],[1,17,4],[3,17,5],
  [1,18,5],[2,18,4],[4,18,5],
  [0,19,4],[2,19,5],[3,19,4],
  [1,20,5],[3,20,4],[4,20,5],
  [0,21,4],[2,21,5],[4,21,4],
  [1,22,5],[2,22,4],[3,22,5],
  [0,23,4],[1,23,5],[4,23,4],
  [0,24,5],[2,24,4],[3,24,5],
  [1,25,4],[3,25,5],[4,25,4],
  [0,26,5],[2,26,4],[4,26,5],
];

// cross-user suggestions: [commenter_index, note_index, comment]
const suggestionRules = [
  [1,0, 'Great intro note. Worth adding semi-supervised learning as a third paradigm between the two.'],
  [2,0, 'The clustering vs classification distinction is very clearly drawn here.'],
  [0,1, 'The derivation of MSE is spot on. A convergence plot would make the learning-rate section even clearer.'],
  [3,1, 'Mini-batch explanation finally clicked after reading this. Really well structured.'],
  [1,2, 'The decision boundary diagram description is super helpful for revision. Would love a 2D example sketch.'],
  [4,2, 'Softmax extension section is exactly what was missing from the lecture slides.'],
  [0,3, 'Random Forest section is excellent. Feature importance via Gini decrease vs permutation importance would be a useful add.'],
  [2,3, 'The bias-variance angle on ensemble methods is the clearest I\'ve seen it explained.'],
  [1,4, 'Curse of dimensionality section is concise and accurate. KD-tree speedup for large datasets could be a nice bonus.'],
  [3,4, 'Cross-validation tip for choosing k is practical and well explained.'],
  [2,5, 'Kernel trick explanation is really clear. A visual showing the RBF mapping to higher dimensions would be perfect.'],
  [4,5, 'Soft-margin SVM section helped me finally understand slack variables.'],
  [0,6, 'Vanishing gradient section is great. Could you add a note on the dying ReLU problem and Leaky ReLU?'],
  [3,6, 'Xavier vs He initialisation comparison is a detail I haven\'t seen covered this clearly anywhere else.'],
  [1,7, 'ROC-AUC explanation is thorough. A quick note on class imbalance and when to prefer F1 over accuracy would be useful.'],
  [4,7, 'Stratified CV explanation is often overlooked — glad it\'s here.'],
  [0,8, 'Scree plot tip is very practical. Would love a worked example showing how many components to keep.'],
  [2,8, 'PCA derivation is clear and concise. Connection to SVD would make this a complete reference.'],
  [1,9, 'K-means++ section is the most useful part. The elbow method example is well explained.'],
  [3,9, 'Limitation with non-convex clusters is an important caveat — good to include DBSCAN as an alternative.'],
  [2,10,'The decomposition into bias + variance + noise is really clear. Great revision note.'],
  [4,10,'Ensemble reducing variance section makes Random Forests click much better now.'],
  [0,11,'Lasso sparsity property explanation is excellent. A path diagram for different λ values would be a great visual.'],
  [3,11,'Elastic Net mention is a nice touch — it\'s often left out of introductory notes.'],
  [1,12,'Target encoding caveat about data leakage is an important warning. Glad it\'s included.'],
  [4,12,'Polynomial expansion section is clear. Interaction terms with domain knowledge examples would help.'],
  [0,13,'Conjugate prior section is very well explained. A Beta-Binomial worked coin-flip example would be perfect.'],
  [2,13,'The posterior update intuition is the clearest I\'ve seen for this topic.'],
  [1,14,'Kernel hyperparameter optimisation via marginal likelihood is well explained. Noise variance discussion would be a bonus.'],
  [3,14,'GP uncertainty bounds are really useful for active learning — worth mentioning.'],
  [0,15,'ELBO derivation is clear. The reparameterisation trick section is very relevant for VAEs.'],
  [4,15,'KL divergence intuition is well explained here. Connection to information theory would round it out.'],
  [0,16,'Metropolis-Hastings walk-through is the clearest I\'ve seen. Rejection rate discussion is a nice practical add.'],
  [2,16,'R-hat convergence diagnostic is often glossed over — glad this note covers it properly.'],
  [1,17,'Bellman equation derivation is clean. Would love a worked gridworld example.'],
  [3,17,'Policy vs value iteration comparison is very well drawn. Convergence guarantees section is solid.'],
  [0,18,'ε-greedy exploration discussion is clear. UCB as an alternative exploration strategy would complement this.'],
  [4,18,'Off-policy vs on-policy distinction in Q-learning vs SARSA is explained really well.'],
  [1,19,'Experience replay motivation is excellent. Prioritised experience replay would be a useful extension.'],
  [2,19,'Target network explanation finally made DQN stable training click for me.'],
  [0,20,'REINFORCE variance problem is well covered. Generalised advantage estimation would be a great follow-up.'],
  [3,20,'PPO mention is helpful for connecting this to modern practice.'],
  [2,21,'The 3-SAT → Independent Set reduction walk-through is superb. Cook-Levin theorem reference is exactly right.'],
  [4,21,'Clearest NP-hardness explanation I\'ve found in this module. Saves a lot of time in revision.'],
  [0,22,'Potential method applied to dynamic arrays is the most intuitive explanation of amortised cost I\'ve seen.'],
  [3,22,'Splay tree amortised analysis is a great example to include — not covered well in lectures.'],
  [1,23,'Max-flow min-cut theorem proof sketch is really helpful. Bipartite matching application would be a nice extension.'],
  [4,23,'Edmonds-Karp complexity derivation is clear and matches the lecture content well.'],
  [0,24,'Sprint velocity explanation is practical and well explained. Burndown chart mention would complete this.'],
  [2,24,'User story format and story points section is concise and accurate.'],
  [1,25,'Liskov Substitution example is the best I\'ve seen for that principle. Classic rectangle/square pitfall is spot on.'],
  [3,25,'Dependency Inversion with an interface example is very clear. Connects well to testability.'],
  [0,26,'The testing pyramid analogy is well used here. Flaky E2E test mitigation tips would be a useful add.'],
  [4,26,'Mocking vs stubbing distinction is often confused — this clears it up perfectly.'],
];

async function seed() {
  console.log('🌱 Adding batch 2 notes with ratings and suggestions...\n');

  const noteIds = [];
  for (const n of notes) {
    const owner = users[n.owner];
    const id = await run(
      'INSERT INTO notes (email, module, note_title, note_data, verified) VALUES (?, ?, ?, ?, ?)',
      [owner, n.module, n.title, n.content, Math.random() > 0.4 ? 1 : 0]
    );
    noteIds.push(id);
    console.log(`  + [${id}] "${n.title}" (${n.module})`);
  }

  let ratingCount = 0;
  for (const [raterIdx, noteIdx, rating] of ratingRules) {
    const noteId = noteIds[noteIdx];
    const rater = users[raterIdx];
    try {
      await run(
        'INSERT OR IGNORE INTO note_ratings (note_id, rater_email, rating) VALUES (?, ?, ?)',
        [noteId, rater, rating]
      );
      ratingCount++;
    } catch (_) {}
  }

  await run(`
    UPDATE notes
    SET rating_average = COALESCE((SELECT AVG(rating) FROM note_ratings WHERE note_id = notes.id), 0),
        number_ratings = (SELECT COUNT(*) FROM note_ratings WHERE note_id = notes.id)
    WHERE id IN (${noteIds.join(',')})
  `);
  console.log(`\n✅ Inserted ${ratingCount} ratings`);

  let suggestionCount = 0;
  for (const [commenterIdx, noteIdx, text] of suggestionRules) {
    const noteId = noteIds[noteIdx];
    const commenter = users[commenterIdx];
    const owner = users[notes[noteIdx].owner];
    await run(
      'INSERT INTO Suggestions (note_id, commenter_id, suggestion_data, note_owner_id) VALUES (?, ?, ?, ?)',
      [noteId, commenter, text, owner]
    );
    suggestionCount++;
  }
  console.log(`✅ Inserted ${suggestionCount} suggestions`);

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
  console.log(`\n🎉 Done — added ${notes.length} notes across ML, Bayesian ML, RL, Algorithms, and SE modules.`);
}

seed().catch(err => {
  console.error('❌ Failed:', err.message);
  process.exit(1);
});
