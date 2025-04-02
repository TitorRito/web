# Hardhat Repo

- importatnt note it uses common js, not module js -> contrary to frontend

## What i did

- an api to fetch the logs directory -> output contracts as a list with address, info
  - this is good for localtesting or even just proviiding minimal user experience (no null contract)
- Front end Components include
  - wallet | for login, view address, network and balance
  - netowrk | for switching network and adding to the user if doesnt exist
  - contract | a cool interface to read and write
