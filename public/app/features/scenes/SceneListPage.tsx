// Libraries
import React, { FC } from 'react';
import { useAsync } from 'react-use';

import { Stack } from '@grafana/experimental';
import { Card, LinkButton } from '@grafana/ui';
import { Page } from 'app/core/components/Page/Page';

// Types
import { getGrafanaSearcher } from '../search/service';

import { getScenes } from './scenes';

export interface Props {}

export const SceneListPage: FC<Props> = ({}) => {
  const scenes = getScenes();
  const results = useAsync(() => {
    return getGrafanaSearcher().starred({ starred: true });
  }, []);

  return (
    <Page navId="scenes" subTitle="Experimental new runtime and state model for dashboards">
      <Page.Contents>
        <Stack direction="column" gap={1}>
          <h5>Test scenes</h5>
          <Stack direction="column" gap={0}>
            {scenes.map((scene) => (
              <Card key={scene.title}>
                <Card.Heading>{scene.title}</Card.Heading>
                <Card.Actions>
                  <LinkButton size="sm" href={`/scenes/${scene.title}`}>
                    Open as standalone scene
                  </LinkButton>
                  <LinkButton size="sm" variant="secondary" href={`/scenes/embedded/${scene.title}`}>
                    Open as embedded scene
                  </LinkButton>
                </Card.Actions>
              </Card>
            ))}
          </Stack>
          {results.value && (
            <>
              <h5>Starred dashboards</h5>
              <Stack direction="column" gap={0}>
                {results.value!.view.map((dash) => (
                  <Card href={`/scenes/dashboard/${dash.uid}`} key={dash.uid}>
                    <Card.Heading>{dash.name}</Card.Heading>
                  </Card>
                ))}
              </Stack>
            </>
          )}
        </Stack>
      </Page.Contents>
    </Page>
  );
};

export default SceneListPage;
