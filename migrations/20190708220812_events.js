
exports.up = function(knex, Promise) {

    return knex
    .schema
    .hasTable('events')
    .then(function (exists) {
        if (!exists) {
            return knex // **** udpate
                .schema
                .createTable('events', function (table) {
                    table.increments('id').primary()
                    table.string('eventname')
                    table.string('eventType')
                    table.string('peopleNumber')
                    table.string('venue')
                    table.string('startTime')
                    table.string('endTime')
                    table.integer('userid')
                })
                .then(console.log("Table events created."));
    }else{
        console.log("Table events already created!");
    }
})
  
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('events');
};
