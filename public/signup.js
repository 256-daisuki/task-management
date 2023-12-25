async function signup() {
  const username = document.getElementById('username').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const errorMessageElement = document.getElementById('errorMessage');

  // エラーメッセージをクリア
  document.getElementById('usernameError').innerHTML = '';
  document.getElementById('emailError').innerHTML = '';
  errorMessageElement.innerHTML = '';

  // ユーザー名の形式をチェック
  const usernameRegex = /^[a-zA-Z0-9_]{3,}$/;
  if (!usernameRegex.test(username)) {
    document.getElementById('usernameError').innerHTML = '無効なユーザー名にゃん！<br>';
  }

  // メールアドレスの形式をチェック
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    document.getElementById('emailError').innerHTML = '無効なメールアドレスにゃん！<br>';
  }

  const response = await fetch('/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ username, email, password })
  });

  if (response.ok) {
    console.log('サインアップ成功にゃん！');
    window.location.href = '/'; // 成功したらリダイレクトなど
  } else {
    console.error('サインアップエラー:', response.status);
    const responseBody = await response.json(); // エラーレスポンスの本文を取得

    if (responseBody && responseBody.errors && responseBody.errors.length > 0) {
      // 複数のエラーメッセージがある場合は表示
      errorMessageElement.innerHTML = responseBody.errors.join('<br>');
    } else {
      errorMessageElement.innerHTML = 'エラーが発生しましたにゃん！';
    }
  }
}
