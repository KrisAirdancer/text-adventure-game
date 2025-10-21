# text-adventure-game

Let's see how this goes.

## Branches

- `main` - Deployment branch (via GitHub Pages).
- `dev` - Development branch.

## Running the Project

- Make sure to run the project's virtual environment
  - `source .venv-thistlerpg/Scripts/activate`
- Check that the virtual environment has started.
  - `which python`
  - You should see a path like this `/c/Users/<username>/projects/text-adventure-game/.venv-thistlerpg/Scripts/python`
- To terminate the virtual environment: `deactivate` (really, that's it)
- Run the project with `fastapi dev main.py`

## Dependencies

To install dependencies for this project: `pip install -r requirements.txt`

### Clean Install of Dependencies

If you need to "clean install" dependencies, remove the environment file and make a new one.

1. Remove the old environment: `rm -rf .venv-thistlerpg`
2. Create a new environment: `python -m venv .venv-thistlerpg`
3. Run the environment and reinstall dependencies.