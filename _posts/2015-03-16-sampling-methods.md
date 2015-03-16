---
layout: post
disqus_comments: yes
title: "Sampling Methods"
---
Most probabilistic models in practice have no exact inference solution,
and so we have to resort to approximation. Besides variational inference,
a numerical approximation called *Monte Carlo* is widely used to conquer
inference problems.

## Monte Carlo Sampling
In many applications, we are intrested in the expectation of some function
$$f(z)$$ respect to a probability distribution $$p(z)$$. However, expectation 
expression

$$
E[f(z)] = \int f(z)p(z) dz
$$

is usually intractable. Monte Carlo methods try to draw a set of independent
samples $$z^{(l)}$$ (where $$l=1, 2, \dots, L$$), from the the distribution, and evaluate

$$
E[\hat{f}(z)] = \frac{1}{L} \sum_{l=1}^L f(z^{(l)}),
$$

to approximate $$E[f(z)]$$. The variance of the estimator is given by

$$
var(\hat{f}(z)) = \frac{1}{L} E[(f(z) - E[f(z)])^2],
$$

so not too many samples are need to get an adequate accurate approximation.

## One-Pass Sampling 
In directed probabilistic graph models, the joint probability is specified by

$$
p(\mathbf{z}) = \prod_i p(\mathbf{z}_i | \pi_i),
$$

where $$\Pi_i$$ denotes the set of $$\mathbf{z}_i$$'s parents. Each variable
can be sampled after its parents have been sampled. If a sample is different
from its corresponding observed value, all samples are discarded and an other
samples is restarted.

To sample a marginal distribution is easy after we have get the joint probability.
When we have drawn a set of samples of joint distribution $$p(z,x)$$, to get
maginal distribution $$p(z)$$, we just need to discard all $$x$$'s in the samples.

However, one-pass sampling is not suit for undirected probabilistic model since we
can not samples each variable one by one. Another problem is its inefficiency. When
there are many observed variables or observed variables is continuous, the probability
of discarding samples is very high. Thus, one-pass sampling has very limited application.

