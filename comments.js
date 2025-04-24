// ✅ تفعيل عرض تفاصيل التعليق عند hover أو الضغط

document.querySelectorAll('.comment-card').forEach(card => {
  const popup = card.querySelector('.review-popup');
  const name = card.dataset.name;
  const rating = card.dataset.rating;
  const feedback = card.dataset.feedback;

  const showPopup = () => {
    popup.innerHTML = `
      <strong>Parent:</strong> ${name}<br>
      <strong>Rating:</strong> ${rating}<br>
      <strong>Feedback:</strong> ${feedback}
    `;
    popup.style.display = 'block';
  };

  const hidePopup = () => {
    popup.style.display = 'none';
  };

  card.addEventListener('mouseenter', showPopup);
  card.addEventListener('mouseleave', hidePopup);
  card.addEventListener('click', () => {
    popup.style.display = popup.style.display === 'block' ? 'none' : 'block';
  });
});

// ✅ إضافة تعليق جديد ديناميكيًا

document.querySelector('.submit-comment-btn').addEventListener('click', function (e) {
  e.preventDefault();

  const textarea = document.querySelector('.add-comment-container textarea');
  const commentText = textarea.value.trim();
  const parentName = document.getElementById('parentName').value.trim();
  const rating = document.getElementById('rating').value;

  if (commentText === '' || parentName === '' || rating === '') return;

  const commentCard = document.createElement('div');
  commentCard.classList.add('comment-card');
  if (document.body.classList.contains('dark-theme')) {
    commentCard.classList.add('new-comment-card');
  }

  commentCard.dataset.name = parentName;
  commentCard.dataset.rating = rating;
  commentCard.dataset.feedback = commentText;

  commentCard.innerHTML = `
    <div class="comment-user">
      <img src="images/kids-profile.jpeg" alt="User Image">
    </div>
    <div class="comment-text">
      <p class="comment-preview">${commentText.slice(0, 40)}...</p>
      <div class="review-popup"></div>
    </div>
  `;

  document.querySelector('.comments-container').appendChild(commentCard);
  textarea.value = '';
  document.getElementById('parentName').value = '';
  document.getElementById('rating').value = '';

  // تفعيل الهوفر أو الضغط للكرت الجديد
  const popup = commentCard.querySelector('.review-popup');
  const showPopup = () => {
    popup.innerHTML = `
      <strong>Parent:</strong> ${parentName}<br>
      <strong>Rating:</strong> ${rating}<br>
      <strong>Feedback:</strong> ${commentText}
    `;
    popup.style.display = 'block';
  };
  const hidePopup = () => {
    popup.style.display = 'none';
  };
  commentCard.addEventListener('mouseenter', showPopup);
  commentCard.addEventListener('mouseleave', hidePopup);
  commentCard.addEventListener('click', () => {
    popup.style.display = popup.style.display === 'block' ? 'none' : 'block';
  });
});