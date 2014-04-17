// define the Discussions class
function Discussions()
{
    this.list = null;
}

Discussions.prototype.get = function()
{
    this.list = [
        { recipients : ["benoit.toulet@gmail.com", "pgil80@yahoo.fr"] },
        { recipients : ["benoit.toulet@gmail.com"] }
    ];
}

Discussions.prototype.new = function(recipients)
{
    this.list.push( { recipients : recipients } );
}