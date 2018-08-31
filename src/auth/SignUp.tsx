import * as React from 'react';
import { connect } from 'react-redux';
import { signUp } from '@app/auth/actions';
import { getError, getLoading } from '@app/auth/selectors';
import { State as AppState } from '@app/store';
import { Error as ErrorType } from '@app/types';
import { Button, Container, Error, Input, LinearLayout, Title } from '@app/ui';

interface State {
  readonly email: string;
}

interface Props {
  error: ErrorType | null;
  loading: boolean;
  signUp(token: string): void;
}

export class SignUp extends React.Component<Props, State> {
  readonly state: State = { email: '' };

  signUp(e: React.SyntheticEvent) {
    e.preventDefault();
    this.props.signUp(this.state.email);
    return false;
  }

  render() {
    const { error, loading } = this.props;

    return (
      <Container size="small">
        <LinearLayout direction="column" fill>
          <form onSubmit={(e) => this.signUp(e)}>
            <Title>The IDDOG</Title>
            <Input
              placeholder="your email"
              type="email"
              value={this.state.email}
              onChange={(e) => this.setState({ email: e.target.value })}
            />
            <Error>{error && error.message}</Error>
            <Button loading={loading}>
              Entrar
            </Button>
          </form>
        </LinearLayout>
      </Container>
    );
  }
}

const mapState = (state: AppState) => ({
  error: getError(state),
  loading: getLoading(state),
});

const mapDispatch = {
  signUp,
};

export default connect(mapState, mapDispatch)(SignUp);
