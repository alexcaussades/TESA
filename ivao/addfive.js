const fs = require("fs");

module.exports.run = async (id, autorhname, vidarray) => {
  let membre_id = id;
  let membre_name = autorhname;
  let vid = vidarray[0];

  let create = {
    data: {
      id: membre_id,
      name: membre_name,
    },
    vid: {
      0: vid,
    },
  };
  let created = JSON.stringify(create, null, 2);
  await fs.writeFile(
    "./ivao/favvid/" + membre_id + ".json",
    created,
    function (error) {
      if (error) {
        console.log(error);
      }
    }
  );
};
