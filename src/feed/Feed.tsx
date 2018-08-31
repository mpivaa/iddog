import * as React from 'react';
import { goBack, push } from 'connected-react-router';
import { connect } from 'react-redux';
import { fetchFeed } from '@app/feed/actions';
import Detail from '@app/feed/Detail';
import { getCategory, getDataList, getError, getId } from '@app/feed/selectors';
import { Category } from '@app/feed/ui';
import { State as AppState } from '@app/store';
import { Error } from '@app/types';
import { Container, LazyImage, LinearLayout, Title } from '@app/ui';

interface Props {
  category: string;
  id: string;
  list: string[];
  error: Error | null;
  fetchFeed(category: string): void;
  promoteItem(src: string, category: string): void;
  goBack(): void;
}

export class Feed extends React.Component<Props> {
  public componentDidMount() {
    this.props.fetchFeed(this.props.category);
  }

  public componentDidUpdate(prevProps: Props) {
    if (this.props.category !== prevProps.category) {
      this.props.fetchFeed(this.props.category);
    }
  }

  public render() {
    const { list, category, promoteItem, id, goBack } = this.props;
    const categories: { [key: string]: string } = {
      husky: 'Husky',
      labrador: 'Labrador',
      hound: 'Hound',
      pug: 'Pug',
    };

    return (
      <Container size="large">
        <LinearLayout direction="column">
          <Title>The IDDOG</Title>
          <LinearLayout direction="row">
            {Object.keys(categories).map((key) => (
              <Category key={key} to={key} active={key === category}>
                {categories[key]}
              </Category>
            ))}
          </LinearLayout>
          <LinearLayout direction="row" wrap>
            {list.map((src) => (
              <LazyImage
                key={src}
                cover
                size="medium"
                src={src}
                onClick={() => promoteItem(src, category)}
              />
            ))}
          </LinearLayout>
        </LinearLayout>
        {id && <Detail id={id} goBack={goBack} />}
      </Container>
    );
  }
}

const mapState = (state: AppState) => ({
  list: getDataList(state),
  error: getError(state),
  category: getCategory(state, 'husky'),
  id: getId(state),
});

const mapDispatch = {
  fetchFeed,
  promoteItem(src: string, category: string) {
    return push({
      search: `?category=${category}&id=${src}`,
    });
  },
  goBack,
};

export default connect(mapState, mapDispatch)(Feed);
