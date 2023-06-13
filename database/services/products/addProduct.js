// require('../../../app');
require('../../utils/connectDb');
const Product = require('../../models/product');
const { count } = require('../../models/user');

const createProduct = async (data) => {
  try {
    const product = new Product(data);
    await product.save();
    console.log(product);
  } catch (error) {
    console.log(error);
  }
};

function addProduct(name, description, price, category, photoPath, quantity) {
    createProduct({
        name: name,
        description: description,
        price: price,
        category: category,
        photoPath: photoPath,
        quantity: quantity
      });
  }

 
  
  addProduct('SONY WH-1000XM4 ANC', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea sint, ab obcaecati quae doloribus, minima iusto laboriosam, quo assumenda repellat aspernatur at magni praesentium? Consequuntur nulla dolores saepe eligendi cupiditate nemo recusandae maxime laboriosam dolore illo! Ducimus eius distinctio illo ab commodi obcaecati. Distinctio architecto nulla laudantium vitae expedita, enim minima facilis labore error cumque voluptate natus velit similique perspiciatis.', 1199, 'Słuchawki','wh-1000xm5-anc-czarny-4548736132580-1.jpg.webp', 5)
  addProduct('STEELSERIES Rival 3', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus maiores quaerat magni, molestiae natus quasi eius ratione libero vero omnis. Tempore soluta id iusto consectetur hic voluptate odit quam sit.', 130, 'Myszki','steelseries-rival-3-1.jpg.webp', 15)
  addProduct('AirPods Pro', 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Earum alias delectus provident? Aperiam, beatae cum reiciendis aut ipsam quibusdam quia eos commodi id dicta magnam in nulla quam esse excepturi eaque voluptate fugit quod tempora, omnis, sequi libero provident. Ex, voluptatum facilis.', 1280, 'Słuchawki','MQD83.jpg', 23)
  addProduct('iSzmata', 'Lorem ipsum dolor sit.', 5000, 'Akcesoria','iszmata.webp', 14)
  addProduct('RAZER Huntsman Mini', 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Molestias dignissimos maiores rem voluptatum sunt?Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis quisquam veniam in error autem doloribus earum debitis repellendus a dolorem deserunt, exercitationem delectus illo! Fuga accusamus rerum nobis magnam similique?', 470, 'Klawiatury','razer-huntsman-mini.jpg.webp', 12)
  addProduct('RAZER Basilisk X HyperSpeed', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores nam omnis voluptates reiciendis iure in maxime autem atque! Voluptatibus a expedita sequi fuga, quaerat, deserunt optio reiciendis aliquid necessitatibus iste mollitia, cum modi eos. Perferendis obcaecati dolorum consequuntur? Facere fugiat amet consequatur debitis! Soluta, quam dolores! Sed reprehenderit dolorem temporibus, nisi accusamus asperiores aliquam enim aut fugit hic, quidem obcaecati! Ad a quis beatae ut qui, amet quaerat. Qui velit veritatis laborum iste, rerum eligendi facere cumque sunt atque ad iusto! Tempora esse voluptatum mollitia obcaecati qui minima perferendis laboriosam.', 350, 'Myszki','razer-basilisk-x-hyperspeed-1.jpg.webp', 10)
  addProduct('LOGITECH Pop Keys', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem at numquam unde quaerat error sapiente, iusto, repellendus modi iure, maiores nemo debitis. Ut quod adipisci quae iste. Excepturi tenetur itaque beatae quibusdam ad, maiores iure impedit nobis qui, dolorem aut sequi quos praesentium adipisci neque odit atque cumque dolorum tempore repudiandae, nulla iste explicabo dolores. Sequi at cum harum error atque porro inventore eveniet a voluptate molestiae earum illo eos ea dolores quam, quasi ipsum repudiandae vel incidunt repellendus neque qui aspernatur. Qui veritatis mollitia blanditiis modi, natus minima quod veniam nisi laboriosam illum quia repudiandae nulla ipsam, deserunt, eveniet impedit. Quasi, non optio sed ex qui architecto eum dolor blanditiis, voluptatibus voluptate repudiandae dicta fuga consectetur perferendis et asperiores! Odit omnis ex voluptatum doloribus accusantium a obcaecati. Consequatur cum esse placeat et corrupti tempora quidem sequi, dicta vel, iste minima repellat ex praesentium id, consequuntur quibusdam odit. Repudiandae explicabo placeat accusamus aperiam nihil, odit doloremque debitis. A harum sunt numquam suscipit molestias provident, beatae tempore doloremque repellendus, ipsam quo explicabo vitae aspernatur unde, repudiandae quibusdam nam sapiente incidunt nulla minima totam ipsum laborum sint cupiditate? Beatae, odit! Hic ratione explicabo adipisci rerum, esse porro eos! Natus nam alias dolorum vel deserunt tempora numquam eveniet veritatis neque officiis reprehenderit, sapiente porro odio! Ratione fugiat illum, at officiis aperiam ea iure sequi provident vitae eligendi. Earum reiciendis, quaerat delectus ab tempora quibusdam accusamus maiores in totam unde aliquid, mollitia odio facere iste eius nisi omnis qui. Ad suscipit consequuntur necessitatibus non corrupti eum dolore consequatur quis ea, nemo deleniti perferendis quidem est voluptatem tenetur dolores molestiae eius esse distinctio. Dolorum explicabo dignissimos veniam quis architecto earum voluptatum inventore tenetur, eligendi, repellendus, tempora illum cumque. Culpa, neque sapiente quae eveniet libero maiores accusantium officiis et consequuntur repellat vero voluptatem consequatur enim maxime molesti.', 300, 'Klawiatury','1_Pop Keys Fioletowo-biały (Daydream) 920-010736.jpg.avif', 2)

  // addProduct('Klawiatura mechaniczna', 'Klawiatura z mechanicznymi przełącznikami', 600, 'Elektronika','<path>', '5')




//   createProduct({
//     name: 'Klawiatura mechaniczna',
//     description: 'Klawiatura z mechanicznymi przełącznikami',
//     price: 250,
//     category: 'Elektronika'
//   });


