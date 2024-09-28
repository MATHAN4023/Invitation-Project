const { Auth } = require("../Common_Layer/Insistance");
const { Product } = require("../Common_Layer/Insistance");

async function AddBranch(req) {
    const { username, password } = req.body
    console.log("hello dear model!", username);
    try {
        await Product.query('BEGIN');
        const InsertInStaticBranch = await Product.query(`INSERT INTO public.branch_details_static(
	"CreatedBy", "Location", "Created-Time", "Created-Date")
	VALUES ($1, $2, CURRENT_TIMESTAMP, CURRENT_DATE) RETURNING "Branch-Id";`, ['nithi', 'Kovai']);
        const BranchId = InsertInStaticBranch.rows[0]["Branch-Id"];

        const result = await Product.query(`INSERT INTO public.branch_details_dynamic(
	"Branch-Id", "Branch-Name", "Owner-Name", "UpdatedBy", "Mobile-No", "Owner-Email", "Pan-Number", "Updated-Time", "Updated-Date", "Status")
	VALUES ($1, $2, $3, $4, $5, $6, $7, CURRENT_TIMESTAMP, CURRENT_DATE, $8);`, [BranchId, 'Ganthipuram', 'Nithi', 'Prem', 9876543210, 'nithi4@gmail.com', 'LMNOP9012Q', 1]);
        await Product.query('COMMIT'); // Commit transaction if successful
        return true;

    } catch (err) {
        await Product.query('ROLLBACK');
        console.error('Error executing query', err.stack);
        // throw new Error('Internal Server Error -Nithi');
        return false;
        // res.status(500).json({ error: 'Internal Server Error' });
    }
}


module.exports = {AddBranch };