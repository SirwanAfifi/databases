const getRepliesCount = (comment, count = 0) => {
  if (comment.replies.length === 0) {
    return 1;
  }
  for (const reply of comment.replies) {
    count += getRepliesCount(reply, count);
  }
  return count;
};

module.exports = getRepliesCount;
