✅ How It Works (Tutorial Type)
1. Create

User types → click Add → data saved via:

push(dataRef, { text: text })

2. Read

Firebase auto-updates UI using:

onValue(dataRef, snapshot => { ... })


This is your adapter in JS.

3. Update

User clicks EDIT → prompt → update in DB:

update(ref(db, "simpleCRUD/" + id), { text: newText });

4. Delete
remove(ref(db, "simpleCRUD/" + id));