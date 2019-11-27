$(function(){
  function buildHTML(message){
    let image = ( message.image ) ? `<img class= "lower-message__image" src=${message.image} >` : "";
    let html =
      `<div class="message" data-message-id=${message.id}>
        <div class="upper-message">
          <div class="upper-message__user-name">
            ${message.user_name}
          </div>
          <div class="upper-message__date">
            ${message.date}
          </div>
        </div>
        <div class="lower-message">
          <p class="lower-message__content">
            ${message.content}
          </p>
          ${image}
        </div>
      </div>`
      return html; 
  }
  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');
    
    $.ajax({
      url: url,  //同期通信でいう『パス』
      type: 'POST',  //同期通信でいう『HTTPメソッド』
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.messages').append(html);
      $('.messages').animate({ scrollTop: $('.messages')[0].scrollHeight});
      $('form')[0].reset();
    })
    .fail(function() {
      alert("メッセージを送信できませんでした");
    });
     return false;
   });

  let reloadMessages = function() {
    if (window.location.href.match(/\/groups\/\d+\/messages/)){
    let last_message_id = $('.message:last').data("message-id");        //カスタムデータ属性を利用し、ブラウザに表示されている最新メッセージのidを取得
    $.ajax({
      url: "api/messages",                                //ルーティングで設定した通り/groups/id番号/api/messagesとなるよう文字列を書く
      type: 'get',                                        //ルーティングで設定した通りhttpメソッドをgetに指定
      dataType: 'json',
      data: {last_id: last_message_id}                    //dataオプションでリクエストに値を含める
    })
    .done(function (messages){
      let insertHTML = '';
      messages.forEach(function (message) {
        insertHTML = buildHTML(message); 
        $('.messages').append(insertHTML);
      })
      $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast');
    })
    .fail(function() {
      
    });
  }};
  setInterval(reloadMessages, 7000);
});