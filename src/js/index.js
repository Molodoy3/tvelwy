import { Client } from 'amocrm-js'

const client = new Client({
    // логин пользователя в портале, где адрес портала domain.amocrm.ru
    domain: 'artemnikonov2005', // может быть указан полный домен вида domain.amocrm.ru, domain.amocrm.com
    auth: {
      client_id: '0f8d168b-8faa-4e97-b193-db307e5c7d39', // ID интеграции
      client_secret: 'y1dgAlaaL5yByITPUjQvhfmrL8b9nVr82jxCnp76inXr18wjCiUooSwtyKuJawVa', // Секретный ключ
      redirect_uri: 'http://tvelvi.com/amo/amo.php', // Ссылка для перенаправления
      code: 'def5020002a6e9e7d2e6efc837fe2f3ce4a4911805b502e0927ccbea942380c7940d73b9ecf8dd5f054b619bad0d73bb494cc2b748dd7c361f26bafc00301bb00fd97884d3241081528b77f91aae639596abfa84799e1f450d0137406399319d84d717a6e9c72cdc6008e0102e17b30fcd8ebd43e95ab533d4237b2904bbaa09cba57ffdea8b46323f91df1d050d75f2632bf519e5250b59d6d1168f9c5a2b738ec96c526ef477991fc4c4d3b03dbd5a9beabfeb9380319d1beb532dab632ff61d41638a7d6160942785c25756c071f2e0c28ec97d30351cb12eaa01c907189bd78760b7868d79afab159eabd83f8b39655451c9a42cc5c1340461a14c0b4b763a8dab8b41c23f369c3f63ee03807182348e6bfb8b0bc8285ec490baab2fccdf35db48987ac7aaa9d4625029a0e33a98b29a87616a855a03224efe8de9aefd9b1cdd7ffb9302c9fbf901926522fea8b5edd6db74b877f0583c313be2ba4c478117d02c8562a7a9909a97a910c012aefb8aa97de729a492b24b293a74456c22dcfe623328cce32a7eabb5bed91975ac7a11fb3cc05751d292a30d861b9eba902e3920ce73a1d8ae7210d9a6f15154781e90439988c1f8baf8e3edde99eb4463a6456e4c34386787a2d579f232ae69d4356770b61cbe79e7cf1b3a82e682e999e67ee7a8ad34189b72bd2d263891f6d0b4', // Код для упрощённой авторизации, необязательный
      state: 'state',
      server: {
          // порт, на котором запустится сервер авторизации
          port: 3000
      }
    },
});

(async ()=> {
    const status = await client.connection.connect();
    console.log( {status} );
})();

